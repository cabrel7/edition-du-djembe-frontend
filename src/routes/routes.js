
import DashbordComponent from "@/components/admin/dashbordComponent.vue";
import DriverdashComponent from "@/components/admin/driverdashComponent.vue";
import AboutComponent from "@/components/main/aboutComponent.vue";
import BookingComponent from "@/components/main/bookingComponent.vue";
import ContactComponent from "@/components/main/contactComponent.vue";
import CreateprofilComponent from "@/components/main/createprofilComponent.vue";
import FleetComponent from "@/components/main/fleetComponent.vue";
import HomeComponent from "@/components/main/homeComponent.vue";
import LoginComponent from "@/components/main/loginComponent.vue";
import PricesComponent from "@/components/main/pricesComponent.vue";
import Testcomponent from "@/components/main/testcomponent.vue";
import layoutcomponent from "@/components/require/loyoutComponent.vue"
import { createRouter, createWebHistory } from "vue-router";


const routes = [
  //les parents


  {
  path: '/loc',
  name: 'loc',
  component: Testcomponent,
 
},
  {
  path: '/login',
  name: 'login',
  component: LoginComponent,
 
},
 {
  path:'/register',
  name:'register',
  component:CreateprofilComponent
  
},
{
  path:'/driver/driver-dashboard',
  name:'driver-dashboar',
  component: DriverdashComponent
},
{
  path:'/admin/dashboard',
  name:'dashboard',
  component: DashbordComponent
},
{
  path:'/',
  name:'',
  component:layoutcomponent,
  redirect:'/home',
  children:[
  
    {
  path:'/home',
  name:'home',
  components:{
    default:layoutcomponent,
    two:HomeComponent
  }
},
 
    {
  path:'/booking',
  name:'booking',
   components:{
    default:layoutcomponent,
    two:BookingComponent
  }
  
},
{
path:'/prices',
name:'prices',

 components:{
    default:layoutcomponent,
    two:PricesComponent
  }
},
{
  path:'/fleet',
  name:'fleet',
 
   components:{
    default:layoutcomponent,
    two:FleetComponent
  }
},
{
  path:'/about',
  name:'about',
 
   components:{
    default:layoutcomponent,
    two:AboutComponent
  }
},
{
  path:'/contact',
  name:'contact',
 
   components:{
    default:layoutcomponent,
    two:ContactComponent
  }
}


  ]
},


  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
