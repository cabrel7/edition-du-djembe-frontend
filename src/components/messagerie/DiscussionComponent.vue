<template>
    <div class="w-full h-full bg-green-500">
        <!-- Modal Carrousel -->
        <div v-if="modalOpen"
            class="absolute w-full h-full inset-0 z-[12] bg-black bg-opacity-50 flex items-center justify-center">
            <div
                class="relative w-[90%] md:w-[60%] md:h-[80%] lg:w-[80%] h-[60%] lg:h-[80%] rounded-lg overflow-hidden">
                <img v-if="currentFile.type.startsWith('image')" :src="localhostmsg + currentFile.fichier"
                    class="h-full w-full object-contain object-center rounded-lg" />
                <video v-else-if="currentFile.type.startsWith('video')" :src="localhostmsg + currentFile.fichier"
                    controls autoplay class="h-full w-full object-contain object-center rounded-lg" />
                <!-- Bouton fermeture -->
                <button class="absolute top-0 right-0 w-8 h-8 font-bold" @click="closeModal">
                    <img src="../../img/close_500px.png" class="w-full h-full object-cover object-center" alt="">
                </button>
                <!-- Navigation -->
                <button v-if="selectedFiles.length > 1"
                    class="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold px-2"
                    @click="prevFile">
                    ‹
                </button>
                <button v-if="selectedFiles.length > 1"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold px-2"
                    @click="nextFile">
                    ›
                </button>
            </div>
        </div>

        <div class="h-full flex flex-col relative">
            <!-- Chat Header -->
            <div v-if="showGroupInfo" class="absolute flex justify-center inset-0 z-0  bg-black/20">
                <div
                    class=" duration-1000   bg-white w-full overflow-y-auto lg:h-[70vh] h-[100vh]   z-50 top-16  absolute lg:max-w-[45%]    rounded-lg shadow-lg">
                    <div
                        class="bg-white px-4 h-[10vh] shadow-md flex justify-between items-center sticky top-0 border-b w-full">
                        <img @click="fermer" class="h-4 w-4" src="../../img/back_208px.png" alt="">
                        <h2 class="text-xl font-bold  flex justify-between item-center  text-gray-800 "> Info du groupe
                        </h2>
                        <!-- <button @click="fermer()" class="text-gray-500 hover:text-red-500">&times;</button> -->
                    </div>

                    <div class="p-4 w-full">
                        <div class="w-full flex justify-center"> <img
                                :src="'http://127.0.0.1:8000/profil/' + correspondant.profil"
                                class="w-32 h-32 object-cover object-center bg-white rounded-full border border-[#5D55F5]/20"
                                alt=""></div>
                        <h3 class="text-lg font-normal text-center ">Nom : {{ correspondant.nom_groupe }}</h3>
                        <h4 class="text-xs font-light mb-2 text-center text-gray-400">Membres:({{ members.length }})
                        </h4>

                        <p class="text-gray-600 text-xs  text-center">Créé {{ getdate(correspondant.created_at) }}</p>
                    </div>

                    <div class=" p-4">

                        <ul class="divide-y">
                            <h1 class="text-center">Liste de Membres</h1>
                            <button @click="addmember(correspondant.id)" v-if="correspondant.create_by == user.id"
                                class="flex justify-center text-md w-full text-bold text-blue-600 items-center ">
                                <p>Ajouter les Membres</p> <img src="../../img/Plus_480px.png"
                                    class="h-4 w-4 object-cover object-center " alt="">
                            </button>
                            <li v-for="member in members" :key="member.id" class="py-2">
                                <div class="flex items-center gap-2">
                                    <img :src="'http://127.0.0.1:8000' + member.avatar"
                                        class="w-8 h-8 object-cover object-center bg-white rounded-full border border-[#5D55F5]/20"
                                        alt="">
                                    <div class="flex w-full justify-between"> <span>{{ member.name }}</span> <span
                                            class=" text-green-600 disabled:cursor-not-allowed">{{
                                                member.id == correspondant.create_by ? 'proprietor' : '' }}</span> <button
                                            @click="deletemember(member.id)"
                                            v-if="member.id !== correspondant.create_by"
                                            class="text-xs text-red-600 shadow-red-600 ">Retirer</button> </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="addMemberModal"
                class="absolute w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
                <div
                    class="duration-1000   bg-white w-full overflow-y-auto lg:h-[70vh] h-[100vh]   z-50 top-16  absolute lg:max-w-[45%]    rounded-lg shadow-lg">
                    <div class="bg-[#5D55F5] p-4 sticky top-0   text-white">
                        <h2 class="text-xl font-bold">Ajouter les Membres du Groupe</h2>
                    </div>





                    <div v-for="user in availableUsers" :key="user"
                        class="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        @click="toggleMember(user)">
                        <input type="checkbox" :checked="selectedMembers.includes(user.id)"
                            class="mr-2 h-4 w-4 text-[#5D55F5] rounded accent-[#5D55F5]" @change="toggleMember(user)" />
                        <img :src="'http://127.0.0.1:8000' + user.avatar"
                            class="w-10 object-cover object-center border border-[#5D55F5]/20 h-10 rounded-full mr-2" />
                        <span>{{ user.name }}</span>
                    </div>



                    <div class="flex justify-end sticky bottom-0  p-4 bg-gray-50">
                        <button @click="[addMemberModal = false, selectedMembers = []]"
                            class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mr-2">
                            Annuler
                        </button>
                        <button @click="addmembergroup()" :disabled="!canCreateGroup"
                            class="px-4 py-2 bg-[#5D55F5] text-white rounded-lg hover:bg-[#5D55F5]/20 disabled:opacity-50 disabled:cursor-not-allowed">
                            Créer
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-[#5d55f5] p-4 text-white flex justify-between items-center">
                <div class="flex items-center ">

                    <router-link to="/messagerie" class=" rounded-full hover:bg-[#5D55F5]/40 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 00-2 0v4.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 9.586V5z"
                                clip-rule="evenodd" />
                        </svg>
                    </router-link>
                    <div @click="prof == 'group' ? openGroupModal(correspondant) : console.log('')"
                        class="flex ml-3 gap-1 h-full cursor-pointer"> <img
                            :src="prof == 'private' ? 'http://127.0.0.1:8000' + correspondant.avatar : 'http://127.0.0.1:8000/profil/' + correspondant.profil"
                            class="w-8 h-8 object-cover object-center bg-white rounded-full border border-[#5D55F5]/20"
                            alt="">
                        <span class="ml-3 text-lg font-semibold">{{
                            correspondant.name || correspondant.nom_groupe }}</span>
                    </div>

                </div>
                <router-link to="/messagerie" class=" rounded-full hover:bg-[#5D55F5]/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                    </svg>
                </router-link>
            </div>
            <!-- Messages List -->
            <div class="flex-1 p-4 interface overflow-y-auto space-y-3 bg-gray-300">
                <div v-for="msg in discussion" :key="msg.id" class="flex flex-col w-full"
                    :class="msg.auteur.id === user.id ? 'items-end' : 'items-start'">
                    <div class="max-w-xs min-w-[10rem] lg:max-w-md   rounded-2xl flex flex-col gap-2"
                        :class="msg.auteur.id === user.id ? 'bg-[#5D55F5]/50 text-white' : 'bg-white border border-gray-200'">
                        <!-- Fichiers -->

                        <router-link :to="`/messagerie/${msg.auteur.id}/private`"
                            v-if="prof == 'group' && msg.auteur.id !== user.id"
                            class=" pt-1 pl-2 rounded-t-xl font-medium bg-black/10">~{{
                                msg.auteur.name + ' ' + msg.auteur.prenom }}</router-link>

                        <div class=" p-2">
                            <div v-if="msg.files && msg.files.length"
                                :class="msg.files.length == 1 ? 'grid grid-cols-1' : 'grid grid-cols-2 gap-2'"
                                class=" rounded-lg overflow-hidden ">
                                <template v-for="(file, i) in visibleFiles(msg.files)" :key="i">
                                    <div class="relative group">
                                        <img v-if="file.type.startsWith('image')" :src="localhostmsg + file.fichier"
                                            :class="msg.files.length == 1 ? 'h-64' : 'h-32'"
                                            class="w-full  object-cover rounded cursor-pointer"
                                            @click="openCarousel(msg.files, i)" />
                                        <video v-else-if="file.type.startsWith('video')"
                                            :src="localhostmsg + file.fichier"
                                            :class="msg.files.length == 1 ? 'h-64' : 'h-32'"
                                            class="w-full  object-cover rounded cursor-pointer" muted
                                            @click="openCarousel(msg.files, i)"/>

                                        <!-- Div "+X" par-dessus le 4ᵉ élément -->
                                        <div v-if="i === 3 && msg.files.length > 4"
                                            class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xl font-bold cursor-pointer"
                                            @click="openCarousel(msg.files, 4)">
                                            +{{ msg.files.length - 4 }}
                                        </div>
                                    </div>
                                </template>
                            </div>

                            <!-- Message -->
                            <p v-if="msg.message" class=" text-sm mt-1 break-words">
                                {{ msg.message }}
                            </p>


                            <span class="text-xs   block mt-1 text-right">
                                {{ getdate(msg.created_at) }}

                            </span>
                        </div>
                    </div>


                </div>
            </div>
            <!-- Message Input -->
            <div v-if="inside" class="p-3 bg-white border-t border-gray-200 relative">
                <div v-if="file.length > 0"
                    class="w-[24rem] z-[4] lg:w-[30rem] p-2 flex items-end flex-col top-0 absolute h-[25rem] bg-white rounded-lg border-2 border-[#5D55F5] transform -translate-y-[100%]">
                    <button class="w-5 h-5" @click="close">
                        <img src="../../img/close_500px.png" class="w-full h-full object-cover object-center " alt="">
                    </button>
                    <div class="h-[85%] w-full flex flex-col p-2">
                        <div class="h-full w-full border overflow-hidden border-[#5D55F5] rounded-lg">
                            <template v-if="files[i].type.startsWith('image')">
                                <img :src="files[i].src" class="object-contain h-full w-full" />
                            </template>
                            <template v-else-if="files[i].type.startsWith('video')">
                                <video :src="files[i].src" controls class="h-full w-full object-contain"></video>
                            </template>
                        </div>
                        <div class="h-[10rem] w-full p-1 flex overflow-x-auto gap-1">
                            <div v-for="(file, index) in files" :key="index" @click="change(index)"
                                class="h-[6rem] relative w-[6rem] overflow-hidden flex-shrink-0 rounded-lg border border-[#5D55F5]">
                                <button class="absolute top-1 rigth-1 w-5 h-5" @click.stop="remove(index)">
                                    <img src="../../img/close_500px.png"
                                        class="w-full h-full object-cover object-center" alt="">
                                </button>
                                <img v-if="file.type.startsWith('image')" :src="file.src"
                                    class="object-cover w-full h-full rounded" />
                                <video v-else-if="file.type.startsWith('video')" :src="file.src"
                                    class="w-full h-full object-cover rounded" />
                            </div>
                            <label for="add"
                                class="h-[6rem] cursor-pointer duration-300 hover:bg-gray-200 w-[6rem] flex-shrink-0 rounded-lg border border-[#5D55F5]">
                                <img src="../../img/Plus_480px.png" class="object-cover object-center w-full h-full"
                                    alt="">
                            </label>
                        </div>
                    </div>
                    <div class="flex h-fit w-full gap-1">
                        <input v-model="newmessagefile" placeholder="Écrivez un message..."
                            class="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5D55F5]"
                            @keyup.enter="sendMessagefile" />
                        <button @click="sendMessagefile"
                            class=" bg-[#5D55F5] text-white rounded-full p-2 hover:bg-[#5D55F5]/40 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90"
                                viewBox="0 0 18 18" fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div :class="add ? '-translate-y-[100%] opacity-1' : '-translate-y-[0%] opacity-0'"
                    class="absolute flex-col flex z-[3] duration-300 w-[15rem] h-[5rem] bg-white border-2 border-[#5D55F5] top-0 transform  rounded-lg ">
                    <label
                        class="w-full flex gap-1 pl-2 cursor-pointer items-center h-[50%] hover:bg-[#5D55F5] hover:text-white font-semibold duration-300 text-[#5D55F5]">
                        <img src="../../img/file_512px.png" class="w-5 h-5 object-cover objecct-center" alt="">
                        Fichier
                    </label>
                    <label for="file"
                        class="w-full flex gap-1 pl-2 cursor-pointer items-center h-[50%] hover:bg-[#5D55F5] hover:text-white font-semibold duration-300 text-[#5D55F5]">
                        <img src="../../img/Image File_512px.png" class="w-5 h-5 object-cover objecct-center" alt="">
                        Images/Vidéos
                    </label>
                    <input type="file" @change="charger" accept="image/*,video/*" multiple class="hidden" id="file">
                    <input type="file" @change="addcharger" accept="image/*,video/*" multiple class="hidden" id="add">
                </div>
                <div v-if="correspondant.inside" class="flex gap-2 items-center">
                    <!-- <button class=" bg-[#5D55F5] text-white rounded-full p-2 hover:bg-[#5D55F5]/40 transition-colors">
                        <img src="../../../assets/images/emoji_96px.png" class="h-5 w-5 transform " alt="">
                    </button>   -->
                    <button @click="add = !add"
                        class=" bg-[#5D55F5] z-[5] text-white rounded-full p-2 hover:bg-[#5D55F5]/40 transition-colors">
                        <img src="../../img/Plus_480px.png" class="h-5 w-5 object-cover object-center " alt="">
                    </button>

                    <input v-model="newmessage" placeholder="Écrivez un message..."
                        class="w-full border z-[5] border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5D55F5]"
                        @keyup.enter="sendMessage" />
                    <button @click="sendMessage"
                        class=" bg-[#5D55F5] text-white rounded-full p-2 hover:bg-[#5D55F5]/40 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
                <div v-else class=" flex gap-2 items-center justify-center w-full">
                    <p>Rejoindre le Groupe</p><button
                        class=" bg-[#5D55F5] text-white rounded-full p-2 hover:bg-[#5D55F5]/40 transition-colors">Rejoindre</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
// Plugins utiles pour messagerie
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import calendar from 'dayjs/plugin/calendar';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Langue
import 'dayjs/locale/fr';

// Extensions
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(calendar);
dayjs.extend(utc);
dayjs.extend(timezone);

// Mettre en français
dayjs.locale('fr');
export default {
    data() {
        return {
            addMemberModal: false,
            selectedMembers: [],
            availableUsers: [],
            discussion: [],
            localhost: this.$store.state.localhost,
            localhostimg: this.$store.state.localhostimg,
            token: localStorage.getItem('token'),
            showGroupInfo: false,
            selectedGroup: {},
            members: [],

            inside: false,
            newmessage: '',
            interface: '',
            correspondant: '',
            add: false,
            newmessagefile: '',
            file: [],
            files: [
            ],
            i: 0,
            localhostmsg: this.$store.state.localhostmsg,
            modalOpen: false,
            selectedFiles: [],
            selectedIndex: 0,
        };
    },
    props: ['user'],
    computed: {
        canCreateGroup() {
            return this.selectedMembers.length > 0;
        },
        currentFile() {
            return this.selectedFiles[this.selectedIndex];
        },
        prof() {
            return this.$route.params.type
        }
    },
    async mounted() {
        this.loadConversation()
        this.$emit('current', this.$route.params.id)
        this.interface = document.querySelector('.interface')

        if (this.$route.params.type === 'private') {

            await this.axios.get(this.localhost + 'messagesprive/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then((response) => {
                    this.discussion = response.data.message;
                    this.correspondant = response.data.user
                }).catch((error) => {
                    console.error(error);
                });
        } else {
            await this.axios.get(this.localhost + 'messagegroupe/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then((response) => {
                    this.discussion = response.data.message;
                    this.correspondant = response.data.groupe
                }).catch((error) => {
                    console.error(error);
                });
            await this.axios.get(this.localhost + 'showpossible', {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then((response) => {
                    this.availableUsers = response.data
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        this.scroll()
        console.log(this.user)
        window.Echo.private(`chat.${this.user.id}`).listen(
            '.chat', (e) => {
                console.log(e.message, this.$route.params.id)
                if (e.message.user_id == this.$route.params.id) {
                    console.log(e.message)
                    this.discussion.push(e.message);

                    setTimeout(() => {

                        this.scroll()
                    }, 500)
                }
            }
        )
        window.Echo.private(`chatgroup.${this.$route.params.id}`).listen(
            '.chatgroup', (e) => {
                if (e.message.groupe_id == this.$route.params.id && this.user.id != e.message.user_id) {
                    this.discussion.push(e.message)
                    setTimeout(() => {

                        this.scroll()
                    }, 500)
                }
            }
        )
    },
    watch: {
        '$route.params'(newId, oldId) {
            if (newId.id !== oldId.id || newId.type !== oldId.type) {
                this.loadConversation();
                this.$emit('modifie', [this.$route.params.type, newId])
            }
        },

    },
    methods: {
        async addmembergroup() {
            let formdata = new FormData
            for (let i = 0; i < this.selectedMembers.length; i++) {
                formdata.append('members[]', this.selectedMembers[i])
            }
            formdata.append('group_id', this.correspondant.id);
            await this.axios.post(this.localhost + 'AddGroupMember', formdata, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.members = response.data.members
                this.addMemberModal = false
                this.showGroupInfo = true
                this.selectedMembers = []
            })
        },
        async deletemember(id) {

            await this.axios.delete(this.localhost + `deletemember/${this.correspondant.id}/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(response => {
                this.members = response.data.members

            })


        },
        addmember() {
            this.showGroupInfo = false
            this.addMemberModal = true
        },
        toggleMember(user) {
            const index = this.selectedMembers.indexOf(user.id);
            if (index === -1) {
                this.selectedMembers.push(user.id);
            } else {
                this.selectedMembers.splice(index, 1);
            }
        },
        fermer() {
            this.showGroupInfo = false;
            this.$router.push(this.$route.fullPath)
            //   console.log(this.showGroupInfo
        },
        openGroupModal(correspondant) {
            this.correspondant = correspondant;
            this.showGroupInfo = true;

        },
        async loadConversation() {
            if (this.$route.params.type === 'private') {

                await this.axios.get(this.localhost + 'messagesprive/' + this.$route.params.id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                    .then((response) => {
                        this.discussion = response.data.message;
                        this.correspondant = response.data.user
                        this.inside = true
                        setTimeout(() => {

                            this.scroll()
                        }, 500)
                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                await this.axios.get(this.localhost + 'messagegroupe/' + this.$route.params.id, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.inside = true
                        // alert(response.data.message)
                        this.members = response.data.members;
                        this.discussion = response.data.message;
                        this.correspondant = response.data.groupe





                        setTimeout(() => {

                            this.scroll()
                        }, 500)
                    }).catch((error) => {
                        console.error(error);
                    });
            }
        },
        getdate(date) {
            const now = dayjs();
            return dayjs(date).calendar(now, {
                sameDay: '[Aujourd’hui à] HH:mm',
                nextDay: '[Demain à] HH:mm',
                lastDay: '[Hier à] HH:mm',
                lastWeek: 'dddd [à] HH:mm',
                sameElse: 'D MMM [à] HH:mm',
            });
        },
        scroll() {
            if (this.interface) {
                this.interface.scrollTop = this.interface.scrollHeight;
            }
        },
        sendMessage() {
            if (this.newmessage.length > 0) {
                if (this.$route.params.type === 'private') {

                    this.axios.post(this.localhost + 'envoye_message_prive/' + this.$route.params.id, {
                        messages: this.newmessage,
                    }, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }).then((response) => {
                        this.discussion.push(response.data);
                        this.newmessage = '';
                        setTimeout(() => {

                            this.scroll()
                        }, 500)
                    }).catch((error) => {
                        console.error(error);
                    });
                } else {
                    this.axios.post(this.localhost + 'envoye_message_groupe/' + this.$route.params.id, {
                        messages: this.newmessage,
                    }, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }).then((response) => {
                        this.discussion.push(response.data);
                        this.newmessage = '';
                        setTimeout(() => {

                            this.scroll()
                        }, 500)
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }
        },
        charger(e) {
            for (let i = 0; i < e.target.files.length; i++) {
                this.file[i] = e.target.files[i]
                this.files.push({
                    type: e.target.files[i].type,
                    src: window.URL.createObjectURL(e.target.files[i])
                })
            }
            this.add = false
        },
        change(i) {
            this.i = i
        },
        addcharger(e) {
            for (let i = 0; i < e.target.files.length; i++) {
                this.file.push(e.target.files[i])
                this.files.push({
                    type: e.target.files[i].type,
                    src: window.URL.createObjectURL(e.target.files[i])
                })
            }
        },
        close() {
            this.i = 0
            this.file = []
            this.files = []
        },
        remove(index) {
            if (this.i >= index) {
                this.i = this.i--;
            }
            this.file.splice(index, 1);
            this.files.splice(index, 1);
        },
        sendMessagefile() {
            let formdata = new FormData
            formdata.append('messages', this.newmessagefile)
            for (let i = 0; i < this.file.length; i++) {
                formdata.append('fichier[' + i + ']', this.file[i]);
                formdata.append('type[' + i + ']', this.files[i].type);
            }
            if (this.$route.params.type === 'private') {
                this.axios.post(this.localhost + 'envoye_message_prive/' + this.$route.params.id, formdata, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }).then((response) => {
                    this.discussion.push(response.data);
                    this.newmessagefile = '';
                    this.file = []
                    this.files = []
                    console.log(response.data)
                    setTimeout(() => {
                        this.scroll()
                    }, 500)
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                this.axios.post(this.localhost + 'envoye_message_groupe/' + this.$route.params.id, formdata, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }).then((response) => {
                    this.discussion.push(response.data);
                    this.newmessagefile = '';
                    this.file = []
                    this.files = []
                    console.log(response.data)
                    setTimeout(() => {
                        this.scroll()
                    }, 500)
                }).catch((error) => {
                    console.error(error);
                });
            }
        },
        visibleFiles(files) {
            return files.length > 4 ? files.slice(0, 4) : files;
        },
        openCarousel(files, index) {
            this.selectedFiles = files;
            this.selectedIndex = index;
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
            this.selectedFiles = [];
            this.selectedIndex = 0;
        },
        nextFile() {
            if (this.selectedIndex >= (this.selectedFiles.length - 1)) {
                this.selectedIndex = 0;
            } else {
                this.selectedIndex++
            }
        },
        prevFile() {
            if (this.selectedIndex == 0) {
                this.selectedIndex = this.selectedFiles.length - 1;
            } else {
                this.selectedIndex--
            }
        },
    }
};
</script>

<style>
.interface {
    overflow-y: auto;
}

/* Scrollbar entière */
.interface::-webkit-scrollbar {
    width: 8px;
}

/* Fond de la scrollbar */
.interface::-webkit-scrollbar-track {
    background: #f0f0f0;
    /* Couleur de fond */
    border-radius: 8px;
}

/* Curseur (thumb) */
.interface::-webkit-scrollbar-thumb {
    background-color: #5D55F5;
    /* Couleur de la barre */
    border-radius: 8px;
    border: 2px solid #f0f0f0;
    /* Crée un effet de marge */
}

/* Hover du curseur */
.interface::-webkit-scrollbar-thumb:hover {
    background-color: #5D55F5;
}

.interface {
    scrollbar-width: thin;
    scrollbar-color: #5D55F5 #f0f0f0;
    /* thumb color | track color */
}

/* Optional: Smooth transitions for modal */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>