<template>
    <div class="relative flex flex-col ">
        <div v-if="connexion_complete" class="bg-black bg-opacity-50   z-[51] absolute static h-screen w-full">
            <div class="h-full w-full overflow-hidden flex justify-center relative">
                <transition name="confirmation">
                    <div v-if="anime" class="lg:w-[40%] xl:w-[30%] flex flex-col gap-4 h-fit p-4 md:w-[50%] w-[80%] bg-white duration-300 rounded-xl ">
                        <p class="text-center font-bold text-[#8f2500] text-[18px]">Verification d'email et activation du compte</p>
                        <p class="font-semibold text-center ">
                            <span class="text-[#8f2500]">{{ user.name +' '+user.prenom}}</span> vous avons envoyer un code de confirmation à votre adresse mail qui est le <span class="text-[#8f2500]">{{ user.email }}</span>
                            veuillez le rentrée pour confirmer votre compte
                        </p>
                        <div>
                            <form class="flex flex-col gap-2" @submit.prevent="confirmation">
                                <input v-model="code" id="te" type="number" onkeydown="return event.key >= 0 && event.key <= 9 || ['Backspace','ArrowLeft','ArrowRight','Delete','Tab'].includes(event.key)" inputmode="numeric"   class="w-full appearance-none rounded-lg outline-none border-2 text-[16px]   border-[#dfbf45] px-2 py-1 text-gray-800 font-semibold" required min="100000" max="999999" >
                                <button :class="loading ? 'bg-transparent':''" id="btn" class="mx-auto justify-center items-center flex py-1 rounded-lg w-[8rem] bg-[#dfbf45] duration-300 font-semibold text-white hover:bg-transparent hover:text-[#dfbf45] border-2 border-[#dfbf45] ">
                                    <p v-if="loading == false">Vérifier</p>
                                    <p v-else class="w-7 h-7 rounded-full border-2 border-t-[#dfbf45] animate-spin"></p>
                                </button>
                            </form>
                        </div>
                    </div>
                </transition>
                <p :class="verification_ok?'translate-x-[0]':'translate-x-[100%]'" class="absolute bg-green-500 duration-300 rounded-xl p-4 right-0 font-bold text-white transform">
                    verification effectuer
                </p>
                <p :class="verification_ndem?'translate-x-[0]':'translate-x-[100%]'" class="absolute bg-red-500 duration-300 rounded-xl p-4 right-0 font-bold text-white transform">
                    Erreur code incorrect veuillez verifier le code entrez
                </p>
            </div>
        </div>
        <div v-if="completer_comp" class="bg-black bg-opacity-50   z-[51] absolute static h-screen w-full">
            <div class="w-full h-full relative flex justify-center overflow-hidden  items-center">
                <transition name="complete_compte">
                    <div v-if="complete_compte" class="md:w-[80%] overflow-hidden w-[80%] lg:w-[40%] md:h-[80%] h-[60%] lg:h-[80%] p-2 flex flex-col justify-center items-center gap-4 bg-white rounded-lg">
                        <p class="text-center text-[#8f2500] font-semibold text-[20px] lg:text-[25px]">Completer les information de votre compte</p>
                        <form @submit.prevent="enregistrement" class="flex flex-col md:flex-row lg:flex-col items-center justify-center gap-4 w-full">
                            <div class="flex justify-center items-center">
                                <div class="relative w-48 h-48 rounded-full border-2  border-[#dfbf45]">
                                    <img v-if="image.length>0" :src="image" class="w-full h-full object-cover object-center z-[5] rounded-full" alt="">
                                    <img v-else src="../../img/close_500px.png" class="w-full h-full object-cover object-center z-[5] rounded-full" alt="">
                    
                                    <label for="image" class="absolute w-8 h-8  bottom-2 right-2 cursor-pointer">
                                        <img src="../../img/close_500px.png" class="w-full h-full object-center transform -rotate-90" alt="">
                                    </label>
                                </div>
                                <input @change="input_image" required type="file" class="hidden" id="image">
                            </div>
                            <div class="flex flex-col  gap-4 items-center">
                                <p class="text-center text-[#8f2500] font-semibold ">Centre d'interêt</p>
                                <div  class="flex flex-wrap justify-center gap-2 items-center">
                                    <div v-for="categoriess in categories" :key="categoriess" class="flex items-center gap-1">
                                        <input type="checkbox" v-model="categorie" name="" class="accent-[#8f2500]" :value="categoriess.id" :id="categoriess.nom">
                                        <label :for="categoriess.nom">{{categoriess.nom}}</label>
                                    </div>
                                </div>
                            </div>
                            <button :class="loadinginformation ? 'bg-transparent':''" id="btn" class="mx-auto justify-center items-center flex py-1 rounded-lg w-[8rem] bg-[#8f2500] duration-300 font-semibold text-white hover:bg-transparent hover:text-[#8f2500] border-2 border-[#8f2500] ">
                                <p v-if="loadinginformation == false">Enregistrer</p>
                                <p v-else class="w-7 h-7 rounded-full border-2 border-t-[#8f2500] animate-spin"></p>
                            </button>
                        </form>
                        <p :class="enregistrement_ok?'translate-x-[0]':'translate-x-[100%]'" class="absolute bg-green-500 duration-300 rounded-xl p-4 right-0 font-bold text-white transform">
                            verification effectuer
                        </p>
                    </div>
                    
                </transition>

            </div>
        </div>
        <div class="z-50 w-full sticky  top-0 py-1 flex-wrap md:justify-between items-center px-2 md:px-3 flex bg-[#8f2500]  gap-y-2">
            <div class="h-fit flex gap-1   md:justify-center w-[40%] md:w-fit items-end">
                <router-link to="/acceuil">
                    <img src="../../img/close_500px.png" class="object-contain object-center w-[6rem] lg:w-[8rem]" alt="">
                </router-link>
                <div class="md:flex items-end hidden  space-x-1">
                    <form @submit.prevent="recherche" class="flex bg-white rounded-full border group  focus-within:border-[#dfbf45]  px-2 items-center gap-1">
                        <input required v-model="search" type="text" id="recherche" name="" class="w-[10rem] lg:w-[20rem] outline-none text-gray-500 font-semibold rounded-lg pl-1 py-1 text-[13px]" placeholder="Rechercher un utilisateur..."> 
                        <button class="h-fit w-6">
                            <img src="../../img/close_500px.png" class="w-full h-full object-cover object-center" alt="">
                        </button>
                    </form>
                </div>
            </div>
            <div class="md:flex hidden md:gap-6 lg:gap-10 xl:gap-20 items-end h-full ">
                <router-link to="/acceuille" class="flex flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[14px] " active-class="!text-[#dfbf45]">
                    <img src="../../img/close_500px.png" class="w-6 h-6 object-cover object-center "/>
                    <p>Acceuil</p>
                </router-link>
                <router-link to="/recettes" class="flex flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[14px]" active-class="!text-[#dfbf45]">
                    <img src="../../img/close_500px.png" class="w-6 h-6 object-cover object-center"/>
                    <p>Recette</p>
                </router-link>
                <router-link to="/video" class="flex flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[14px]" active-class="!text-[#dfbf45]">
                    <img src="../../img/close_500px.png" class="w-6 h-6 object-cover object-center"/>
                    <p>Video</p>
                </router-link>
                <router-link to="/creation" class="flex flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[14px]" active-class="!text-[#dfbf45]">
                    <img src="../../img/close_500px.png" class="w-6 h-6 object-cover object-center"/>
                    <p>Creer</p>
                </router-link>
            </div>
            <div class="flex space-x-2 w-[60%] md:w-fit md:space-x-4 justify-end items-center ">
                <router-link to="/messagerie" class="w-6 h-6 md:w-8 md:h-8 relative flex ">
                    <img src="../../img/close_500px.png" title="Message" class="w-full cursor-pointer h-full object-cover object-center " alt="">
                    <p class="absolute text-[12px] text-[#dfbf45] font-semibold -top-1  -right-1">{{nonlu}}</p>
                </router-link>
                <router-link to="/user_profil/favoris" class="w-6 h-6 md:w-8 md:h-8 relative flex ">
                    <img src="../../img/close_500px.png" title="Favorites" class="w-full cursor-pointer h-full object-cover object-center " alt="">
                    <p class="absolute text-[12px] text-[#dfbf45] font-semibold -top-1  -right-1">{{user.favorites ? user.favorites.length:0}}</p>
                </router-link>
                <div class="w-6 h-6 md:w-8 md:h-8 relative flex ">
                    <img src="../../img/close_500px.png" title="Notification" class="w-full cursor-pointer h-full object-cover object-center " alt="">
                    <p class="absolute text-[12px] text-[#dfbf45] font-semibold -top-1 right-0 lg:-right-1">14</p>
                </div>
                <router-link to="/user_profil" class="w-8 h-8 md:w-10 md:h-10 lg:w-[3rem] lg:h-[3rem] rounded-full border border-[#dfbf45] overflow-hidden">
                    <img :src="localimg+user.profil" title="Profil" class="w-full h-full object-cover object-center" alt="">
                </router-link>
                <!-- <div class="w-10  cursor-pointer h-10" @click="logout">
                    <img src="../../../assets/images/in_app_messaging_480px.png" title="Deconnexion" class="w-full h-full object-cover object-center" alt="" >
                </div> -->
            </div>
            <div class="md:hidden w-full  flex gap-3 sm:gap-4 justify-center items-end h-full ">
                <div class="flex space-x-1">
                    <form @submit.prevent="recherche" class="flex bg-white  rounded-full border-2 group  focus-within:border-[#dfbf45]  px-2 items-center gap-1">
                        <input required v-model="search" type="text" id="recherche" name="" class="w-[10rem] outline-none text-gray-500  rounded-lg pl-1 py-1 text-[13px]" placeholder="Rechercher un utilisateur...">
                        <button class="h-fit w-6">
                            <img src="../../img/close_500px.png" class="w-full h-full object-cover object-center" alt="">
                        </button>
                    </form>
                </div>
                <!-- <router-link to="/acceuille" class="flex-col hidden items-center font-semibold duration-300  hover:text-[#dfbf45] text-white text-[12px] " active-class="!flex bottom-2">
                    <img src="../../img/close_500px.png" class="w-6 h-6  object-cover object-center "/>
                </router-link>
                <router-link to="/acceuille" class="flex flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[12px] " active-class="hidden">
                    <img src="../../../assets/images/home2_500px.png" class="w-5 h-5 object-cover object-center "/>
                </router-link>
                <router-link to="/recettes" class="hidden  flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[12px]" active-class="!flex">
                    <img src="../../../assets/images/cooking_book_500px.png" class="w-6 h-6 object-cover object-center"/>
                </router-link>
                <router-link to="/recettes" class="flex  flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[12px]" active-class="hidden">
                    <img src="../../../assets/images/cooking_book2_500px.png" class="w-5 h-5 object-cover object-center"/>
                </router-link>
                <router-link to="/video" class="hidden flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[12px]" active-class="!flex">
                    <img src="../../../assets/images/video_96px.png" class="w-6 h-6 object-cover object-center"/>
                </router-link>
                <router-link to="/video" class="flex flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[12px]" active-class="hidden">
                    <img src="../../../assets/images/video_playlist2_96px.png" class="w-5 h-5 object-cover object-center"/>
                </router-link>
                <router-link to="/creation" class="hidden flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[12px]" active-class="!flex">
                    <img src="../../../assets/images/Beer Recipe_512px.png" class="w-6 h-6 object-cover object-center"/>
                </router-link>
                <router-link to="/creation" class="flex flex-col items-center font-semibold duration-300 hover:text-[#dfbf45] text-white text-[12px]" active-class="hidden">
                    <img src="../../../assets/images/Beer Recipe2_512px.png" class="w-5 h-5 object-cover object-center"/>
                </router-link> -->
               
            </div>
        </div>

        <main class="relative flex-1">
            <router-view name="six" @dropfavorite="dropfavorite" @addfavorite="addfavorite" @profil="profil" @changes="change" @arret_suivie="arret_suivie" v-if="user.id" @suivre="suivre"  :maVar="user"></router-view>
        </main>
    </div>
</template>
<script>


    export default {
        data (){
            return {
                user:{},
                token:'',
                localhost:this.$store.state.localhost,
                connexion_complete:false,
                loading:false,
                loadinginformation:false,
                anime:false,
                verification_ok:false,
                verification_ndem:false,
                code:'',
                verif_code:'',
                image:'',
                formdata:new FormData,
                categorie:[],
                completer_comp:false,
                complete_compte:false,
                enregistrement_ok:false,
                localimg:this.$store.state.localhostimg,
                search:"",
                categories:[],
                meilleurrecette:[],
                nonlu:0,
            }
        },
       async mounted(){
            if(localStorage.getItem('token')){
                this.token = localStorage.getItem('token')
                await this.axios.get(this.localhost +'get-user',{
                    headers: {
                        Authorization: `Bearer ${this.token}`}})
                .then((response)=>{
                    this.user = response.data
                    console.log(response.data)
                })
                .catch((e)=>{
                    console.log(e)
                    if(e.status ===401){
                        localStorage.removeItem('token')
                        window.location.reload()
                    }
                })

                await this.axios.get(this.localhost+"messagenonlu",{
                    headers:{
                        Authorization: `Bearer ${this.token}`
                    }
                })
                .then((response)=>{
                    this.nonlu = response.data
                })
                .catch((e)=>{
                    console.log(e)
                })


                if(this.user.confirmation_compte==0){
                    this.connexion_complete = true
                    setTimeout(()=>{
                        this.anime = true
                    },300)
                    let code = Math.floor(100000 + Math.random() * 900000)
                    this.verif_code = code
                    let fcode = new FormData
                    fcode.append('code',code)
                    console.log(code)
                    await this.axios.post(this.localhost+'confirm_compte',fcode,{
                        headers: {
                            Authorization: `Bearer ${this.token}`}})
                    .then((response)=>{console.log(response.data)}) 
                    .catch((e)=>{console.log(e)})     
                }
                this.completer_compte()
            }else{
                this.$router.push('/')
            }
        },
        methods: {
            dropfavorite(data){
                for(let i=0;i<this.user.favorites.length;i++){
                    if(this.user.favorites[i].id == data.id){
                        this.user.favorites.splice(i,1)
                    }
                }
            },
            addfavorite(data){
                
                this.user.favorites.push(data)
            },
            async confirmation(){
                this.loading = true
                if(this.code === this.verif_code){
                    this.verification_ok = true
                    await this.axios.get(this.localhost+'confirmation_total',{ headers: {
                        Authorization: `Bearer ${this.token}`}})
                    .then((response)=>{
                        this.user = response.data
                        this.loading = false
                        this.anime = false
                        
                        setTimeout(()=>{this.verification_ok = false},1500)
                        setTimeout(()=>{this.connexion_complete = false},2000)
                        setTimeout(()=>{this.completer_compte()},2000)
                        
                    })  
                    .catch((e)=>{console.log(e)})  
                }else{
                    this.verification_ndem = true
                    setTimeout(()=>{
                        this.verification = false
                        this.code = ''
                        document.getElementById('te').focus()
                        this.loading = false
                    },3000)
                }
            },
            change(d){
                this.user.photos_de_couverture = d.photos_de_couverture
            },
            profil(donne){
                this.user.profil = donne.profil
            },
            input_image(event){
                let a = event.target.files[0]
                this.image = URL.createObjectURL(a)
                this.formdata.append('image',a)
                console.log(a)
            },
            async completer_compte(){
                if(this.user.profil==null && this.user.categorie_aimer==null && this.user.confirmation_compte==1){
                    this.completer_comp = true
                    setTimeout(()=>{this.complete_compte=true},300)
                           
                    await this.axios.get(this.localhost+'get_categorie',{
                        headers: {
                            Authorization: `Bearer ${this.token}`}})
                    .then((response)=>{console.log(response.data),this.categories = response.data}) 
                    .catch((e)=>{console.log(e)})  
                }
            },
            async enregistrement(){
                this.loadinginformation = true
                this.categorie = this.categorie.map(Number)
                for(let i=0;i<this.categorie.length;i++){
                    this.formdata.append('categorie[]',this.categorie[i])
                }
                await this.axios.post(this.localhost+'modification_compte',this.formdata,{headers: {Authorization: `Bearer ${this.token}`}})
                .then((response)=>{
                    console.log(response.data)
                    this.user = response.data
                    this.loadinginformation = false
                    this.complete_compte = false
                    this.enregistrement_ok=true
                    setTimeout(()=>{this.enregistrement_ok = false},1500)
                    setTimeout(()=>{this.completer_comp = false},2000)
                })
                .catch((e)=>{console.log(e)})
            },
            async logout(){
                await this.axios.get(this.localhost+"logout",{headers: {Authorization: `Bearer ${this.token}`}})
                .then((response)=>{
                    console.log(response.data)
                    localStorage.removeItem('token')
                    this.$router.push('/')
                })
                .catch((e)=>{console.log(e)})
            },
            recherche(){
                alert (this.search)
            },
            suivre(user){
                this.user.suivies.push(user)
            },
            arret_suivie(donne){
                for(let i=0;i<this.user.suivies.length;i++){
                   
                    if(donne===this.user.suivies[i].id){
                        this.user.suivies.splice(i,1)
                        console.log(this.user)
                    }
                }
            }
        }
    }
</script>


<style>
    /* Chrome, Safari, Edge */
    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type='number'] {
        -moz-appearance: textfield;
    }
    .confirmation-enter-active{
        animation:anime 1s ease-in-out ;
    }
    .confirmation-leave-active{
        animation:animel 1s ease-in-out ;
    }
    .complete_compte-enter-active{
        animation:complete_anim 1s ease-in-out ;
    }
    .complete_compte-leave-active{
        animation:complete_anime 1s ease-in-out ;
    }
    @keyframes anime {
        0%{
            transform: translateY(-100%)
        }
        100%{
            transform: translateY(0%)
        }
    }
    @keyframes animel {
        0%{
            transform: translateY(0%)
        }
        100%{
            transform: translateY(-100%)
        }
    }
    @keyframes complete_anim {
        0%{
            transform: translatex(100%);
        }
        100%{
            transform: translateX(0%);
        }
    }
    @keyframes complete_anime {
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
</style>