<template>
    <div class="flex relative h-screen w-full bg-gray-100 overflow-hidden">
       

        <div :class="isOnCreationRoot?'translate-x-0':'translate-x-[-100%]'" class="absolute lg:relative lg:w-[30%] duration-300 lg:transform-none transform w-full h-full">
            <div class="w-full bg-white border-r-2 border-[#5D55F5]  flex flex-col h-full">
                <!-- Header -->
                <div class="bg-[#5D55F5] p-4 text-white">
                <h2 class="text-xl font-bold">Messages</h2>
                </div>
        
                <!-- Chat List -->
                <div class="flex-1 overflow-y-auto">
                    <router-link  :to="chat.type==='private'?`/messagerie/${chat.id}/private`:`/messagerie/${chat.id}/group`"  v-for="chat in conversation"  :key="chat.id"  class="flex items-center p-3 border-b border-[#5D55F5] hover:bg-[#5D55F5]/40 cursor-pointer transition-colors" :class="{ 'bg-[#5D55F5]/40': activeChat.id === chat.id && activeChat.type === chat.type  }"  @click="activeChat.id=chat.id,activeChat.type=chat.type,chat.unread=0">
                        <div v-if="chat.type =='private' " class="flex items-center w-full">
                            <img :src="'http://127.0.0.1:8000'+chat.user.avatar" class="w-12 h-12 rounded-full object-cover mr-3" />
                            <div class="flex-1 min-w-0">
                                <h3 class="font-semibold text-gray-900 truncate">{{ chat.user.name }}</h3>
                                <p v-if="chat.last_message" class="text-sm h-[20px] text-gray-500 truncate">{{chat.last_message.length > 20?chat.last_message.slice(0,17)+'...':chat.last_message }}</p>
                            </div>
                            <span  v-if="chat.unread"  class="bg-[#5D55F5] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {{ chat.unread }}
                            </span>
                        </div>
                        <div v-if="chat.type =='group' " class="flex items-center w-full">
                            <img :src="localhostimg+chat.groupe.profil" class="w-12 h-12 rounded-full object-cover mr-3" />
                            <div class="flex-1 min-w-0">
                                <h3 class="font-semibold text-gray-900 truncate">{{ chat.groupe.nom_groupe }}</h3>
                                <p v-if="chat.last_message" class="text-sm h-[20px] text-gray-500 truncate">{{ chat.last_message.length > 20 ? chat.last_message.slice(0,17)+'...'  :chat.last_message }}</p>
                            </div>
                            <span  v-if="chat.unread"  class="bg-[#5D55F5] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {{ chat.unread }}
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>
            <button  class="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-[#5D55F5] text-white shadow-lg hover:bg-[#5D55F5]/50 transition-all transform hover:scale-110 flex items-center justify-center z-50" @click="showGroupModal = true">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
        <div class="w-full lg:w-[70%] h-full flex flex-col">
            <main class="flex-1 relative h-full">
                <router-view name="seven" @modifie="modifie" @current="current" :user="maVar"></router-view>
            </main>
           
    
            <div v-if="isOnCreationRoot" class="w-full h-full flex flex-col items-center justify-center bg-white">
                <div class="text-center p-6">
                <h2 class="text-2xl font-bold text-black mb-2">👋 Bienvenue !</h2>
                <p class="text-gray-600">Sélectionnez une conversation ou créez un groupe.</p>
                </div>
            </div>
        </div>
       
  
       
  
       
  
        <div v-if="showGroupModal" class="absolute w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
            <div class="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
            <div class="bg-[#5D55F5] p-4 text-white">
                <h2 class="text-xl font-bold">Créer un groupe</h2>
            </div>
    
            <div class="p-4">
                <input
                v-model="newGroupName"
                placeholder="Nom du groupe"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#5D55F5]"
                />
                <div class="w-full flex flex-col justify-center items-center">
                    <p >Profil</p>
                    <div class="relative w-32 h-32 rounded-full border-2  border-[#5D55F5]">
                        <label for="profilgroup" class="absolute w-5 h-5 bottom-2 right-2">                        
                            <img src="../../img/edit_144px.png" class=" transform -rotate-90 object-cover object-center" />
                        </label>
                        <img :src="profil.length>0 ?profil:require('@/assets/UserGroups_512px.png')" class="w-full h-full rounded-full object-cover object-center" alt="">
                    </div>
                    <input type="file" accept="image/*" @change="profilcharge" class="hidden" id="profilgroup"/>
                </div>
                <h3 class="font-semibold text-gray-700 mb-2">Membres</h3>
                <div class="max-h-60 overflow-y-auto">
                <div
                    v-for="user in availableUsers"
                    :key="user"
                    class="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    @click="toggleMember(user)"
                >
                    <input
                    type="checkbox"
                    :checked="selectedMembers.includes(user.id)"
                    class="mr-2 h-4 w-4 text-[#8F2500] rounded accent-[#8F2500]"
                    @change="toggleMember(user)"
                    />
                    <img :src="'http://127.0.0.1:8000'+user.avatar" class="w-10 object-cover object-center border border-[#5D55F5]/20 h-10 rounded-full mr-2" />
                    <span>{{ user.name }}</span>
                </div>
                </div>
            </div>
    
            <div class="flex justify-end p-4 bg-gray-50">
                <button
                @click="showGroupModal = false"
                class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mr-2"
                >
                Annuler
                </button>
                <button
                @click="createGroup"
                :disabled="!canCreateGroup"
                class="px-4 py-2 bg-[#5D55F5] text-white rounded-lg hover:bg-[#5D55F5]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                Créer
                </button>
            </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
        export default {
            data() {
                return {
                    localhost:'http://127.0.0.1:8000/api/',
                    token:localStorage.getItem('token'),
                    localhostimg:'http://127.0.0.1:8000/profil/',
                    activeChat: {
                        id:0,
                        type:'',
                    },
                    newMessage: "",
                    showGroupModal: false,
                    newGroupName: "",
                    selectedMembers: [],
                    availableUsers: [],
                    conversation:[],
                    profilgroupe:'',
                    profil:'',
                    maVar:{},
                };
            },
            computed: {
                canCreateGroup() {
                    return this.newGroupName.trim() && this.selectedMembers.length > 0;
                },
                isOnCreationRoot() {
                    // On vérifie si on est exactement sur /creation
                    return this.$route.name === 'messagerie';
                }
            },
       
            async mounted(){
                 this.getuser()
                await this.axios.get(this.localhost+'conversation',{
                    headers:{
                        Authorization:`Bearer ${this.token}`
                    }
                })
                .then((response)=>{
                    this.conversation = response.data
                    console.log( this.conversation )
                })
                .catch((e)=>{
                    console.log(e)
                })
                
                await this.axios.get(this.localhost+'showpossible',{
                    headers:{
                        Authorization:`Bearer ${this.token}`
                    }
                })
                .then((response)=>{
                    this.availableUsers = response.data
                })
                .catch((e)=>{
                    console.log(e)
                })
                
                window.Echo.private(`actualise.`+this.maVar.id).listen(
                    '.actualise',(e)=>{
                        for(let i=0;i<this.conversation.length;i++){
                            if(this.conversation[i].id==e.conversation.id&&this.conversation[i].type==e.conversation.type){
                                this.conversation.splice(i,1)
                            }
                        }
                        if(e.conversation.id == this.activeChat.id && e.conversation.type == this.activeChat.type) e.conversation.unread=0
                        this.conversation.unshift(e.conversation);
                        if(e.conversation.id == this.activeChat.id && e.conversation.type == this.activeChat.type){
                            this.activeChat.id = e.conversation.id
                            this.activeChat.type = e.conversation.type
                        }
                    }
                )
               
            },
            watch: {
                '$route.name'(newName) {
                    if (newName === 'messagerie') {
                        this.activeChat.id = 0;
                    }
                }
            },
            methods: {
                toggleMember(user) {
                    const index = this.selectedMembers.indexOf(user.id);
                    if (index === -1) {
                        this.selectedMembers.push(user.id);
                    } else {
                        this.selectedMembers.splice(index, 1);
                    }
                },
                async getuser(){
                     await this.axios.get(this.localhost+'getuser',{
                    headers:{
                        Authorization:`Bearer ${this.token}`
                    }
                }).then((response)=>{
                    this.maVar=response.data
                    console.log(response.data)
                })
                },
                profilcharge(e){
                    this.profilgroupe = e.target.files[0]
                    this.profil = window.URL.createObjectURL(this.profilgroupe)
                    console.log(this.profilgroupe)
                },
                async createGroup() {
                    if (!this.canCreateGroup) return;

                    let formdata = new FormData

                    if(this.profilgroupe != null){
                        formdata.append('profil',this.profilgroupe)
                    }

                    formdata.append('nom',this.newGroupName)

                    for(let i=0;i<this.selectedMembers.length;i++){
                        formdata.append('membre[]',this.selectedMembers[i])
                    }

                    await this.axios.post(this.localhost+'creategroup',formdata,{
                        headers:{
                            Authorization:`Bearer ${this.token}`
                        }
                    })
                    .then((response)=>{
                        console.log(response.data)
                        this.showGroupModal = false
                        this.profil = ''
                        this.selectedMembers = []
                        this.newGroupName = ''
                        this.$router.push(`/messagerie/${response.data.id}/group`)
                    })
                    .catch((e)=>{
                        console.log(e)
                    })
                },
                current(data){
                    this.activeChat.id = Number(data)
                    this.activeChat.type = this.$route.params.type
                },
                modifie(data){
                    console.log(data[1],data[0])
                    this.conversation.forEach(conv =>{
                        if(conv.id == data[1] && conv.type==data[0]){
                            conv.unread = 0
                        }
                    })
                },

            }
        };
</script>
  
<style>
  /* Smooth scrolling for messages */
  .overflow-y-auto {
    scroll-behavior: smooth;
  }
   .overflow-y-auto:-webkit-scrollbar {
      width: 0px;
      }
  
      /* Fond de la scrollbar */
      .overflow-y-auto:-webkit-scrollbar-track {
          background: transparent;   /*Couleur de fond*/
          /* border-radius: 4px; */
      }
  
      /* Curseur (thumb) */
      .overflow-y-auto:-webkit-scrollbar-thumb {
      background-color: rgb(93 85 245 / 0.3);  /* Couleur de la barre */
      border-radius: 8px;
      border: 0px solid; /* Crée un effet de marge */
      }
  
      /* Hover du curseur */
      .overflow-y-auto:-webkit-scrollbar-thumb:hover {
          background-color: rgb(93 85 245 / 0.3);
      }
      .overflow-y-auto{
          scrollbar-width:none;
          scrollbar-color: rgb(93 85 245 / 0.3) #f0f0f0;
        }
  
</style>