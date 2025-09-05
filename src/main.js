import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes'
import store from './store/index'
import "./index.css"
import axios from 'axios'
import VueAxios from 'vue-axios'


// import Echo from "laravel-echo"
// window.AGORA_APP_ID='1a6346ad5b434a45b32e05674c4e60bb'
// window.Pusher = require('pusher-js');
// let token=localStorage.getItem('token')
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: "acbd950b0254bb25fe3c",
//     wsHost:"127.0.0.1",
//     wsPort: 6001,
//     cluster: "eu",
//     forceTLS: false,
//     disableStats: true,
//     authEndpoint :'http://127.0.0.1:8000/api/broadcasting/auth',
//     auth: {
//         headers: {
//           Authorization: `Bearer ${token}`,
//     'X-Requested-With': 'XMLHttpRequest'
//         }
//     }
 
// });

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
