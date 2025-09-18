import { createStore } from 'vuex'
import axios from "axios";
import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'
import { name } from 'dayjs/locale/fr';
export default createStore({
  state: {
    localhost : "http://127.0.0.1:8000/api/",
    localhostimg: "http://127.0.0.1:8000/cars/",
    cars:[],
    user:null,
    reservation:[]


  },
  getters: {
    posts(state){
      return state.posts
    },
    getcars(state){
      return state.cars
    }
    
},
mutations: {
  setcar(state, car) {
    
    state.cars = car;
  },
  setuser(state, user) {
    state.user = user;
  },
  setreservation(state, reservation) {
    state.reservation = reservation;
  },
  
},
actions: {
  
  async fetchdata({ commit, state }) { 
    try {
      let to = localStorage.getItem('id');
      let token = localStorage.getItem('token');
      if(localStorage.getItem('isconnect')==1){
       
      const res = await axios.get(`${state.localhost}alldata`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let car=res.data.voitures.map(car => {
        return {
          name: car.name,
          tarification_heure: car.tarification_heure,
         tarification_kilometrage: car.tarification_kilometrage,
          id: car.id,
          data:{
            id:car.id,
            price:0
          },

           image: state.localhostimg + car.image
        }
       
      })
            commit('setcar', car);
     
      commit('setuser', res.data.user);
      commit('setreservation', res.data.reservations);

      }else{
        
        const res = await axios.get(`${state.localhost}data`);
        let car=res.data.voitures.map(car => {
        return {
          name: car.name,
          tarification_heure: car.tarification_heure,
         tarification_kilometrage: car.tarification_kilometrage,
          id: car.id,
           image: state.localhostimg + car.image
        }
       
      })
      commit('setcar', car);
      
      }
      
    } catch (error) {
      console.error('Erreur lors de la récupération des voitures:', error);
    }
  },

},

  modules: {


  },
})
