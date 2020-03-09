import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index'
import Auth0Callback from '../views/Auth0Callback.vue'
import { authService } from '../auth-service'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import Signin from '../components/Signin/Signin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Signin,
  },
  {
    path: '/auth0callback',
    name: 'auth0callback',
    component: Auth0Callback,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    // meta: { requiresAuth: true }
  },
  // ----------------------------------------------
  
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   component: () => import('../views/Contact.vue')
  // },
  // {
  //   path: '/memebrs',
  //   name: 'Member',
  //   component: () => import('../views/Member.vue'),
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/report-landing',
    name: 'ReportLanding',
    component: () => import('../components/ReportLanding/ReportLanding.vue')
  },
  {
    path: '/plan-and-reports',
    name: 'PlanAndReports',
    component: () => import('../components/PlanAndReports/PlanAndReports.vue')
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('../components/Support/Support.vue')
  },
  {
    path: '/admin/create-plan',
    name: 'CreatePlan',
    component: () => import('../components/CreatePlan/CreatePlan.vue')
  },
  {
    path: '/sign-in',
    name: 'Signin',
    component: () => import('../components/Signin/Signin.vue')
  },
  {
    path: '/report-landing',
    name: 'ReportLanding',
    component: () => import('../components/ReportLanding/ReportLanding.vue')
  },
  {
    path: '/report-landing-plan',
    name: 'ReportLandingPage',
    component: () => import('../components/ReportLandingSwip/ReportLandingPlan.vue')
  },
  {
    path: '/report-landing-swip',
    name: 'ReportLandingPage',
    component: () => import('../components/ReportLandingSwip/ReportLanding.vue')
  },
  // Manpower Swip
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts',
    name: 'Manpower And Personal Contact',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue')
  },
  // Manpower 
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts/member',
    name: 'Member',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue')
  },
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts/associate-member',
    name: 'Associate Member',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue')
  },
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts/preliminary-member',
    name: 'Preliminary Member',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue')
  },
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts/supporter-member',
    name: 'Supporter Member',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue')
  },
  // Manpower 
  {
    path: '/plan-and-report-edit/regular-and-special-meetings',
    name: 'Regular and Special Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue')
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program',
    name: 'Teaching &amp; Learning Program',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue')
  },
  {
    path: '/plan-and-report-edit/dawah-material-distribution',
    name: 'Dawah Material Distribution',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue')
  },
  // Finance Swip
  {
    path: '/plan-and-report-edit/finance',
    name: 'Finance',
    component: () => import('../components/PlanAndReportFields/Finance/FinanceSwip.vue')
  },
  // Finance
  {
    path: '/plan-and-report-edit/finance/baitul-mal',
    name: 'Baitulmal',
    component: () => import('../components/PlanAndReportFields/Finance/FinanceSwip.vue')
  },
  {
    path: '/plan-and-report-edit/finance/masjid-project',
    name: 'Masjid Project',
    component: () => import('../components/PlanAndReportFields/Finance/FinanceSwip.vue')
  },
  {
    path: '/plan-and-report-edit/finance/masjid-table-bank',
    name: 'Masjid Table Bank',
    component: () => import('../components/PlanAndReportFields/Finance/FinanceSwip.vue')
  },
  // Finance
  {
    path: '/plan-and-report-edit/social-welfare',
    name: 'Social Welfare',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue')
  },
  {
    path: '/plan-and-report-edit/other',
    name: 'Other',
    component: () => import('../components/PlanAndReportFields/Others/OtherSwip.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( (to,from,next)=>{
  if(to.matched.some(record=>record.path == "/auth0callback")){
   console.log("router.beforeEach found /auth0callback url");
   authService.handleAuthentication();
   next(false);
 }
  let routerAuthCheck = false;  
  if( localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('id_token_expires_at') ){
    console.log('found local storage tokens');
    // Check whether the current time is past the Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('id_token_expires_at')!);
    // set localAuthTokenCheck true if unexpired / false if expired
    routerAuthCheck = new Date().getTime() < expiresAt;  
  }
 
   // set global ui understanding of authentication
   Store.commit('setUserIsAuthenticated', routerAuthCheck);
 
   // check if the route to be accessed requires authorizaton
   if (to.matched.some(record => record.meta.requiresAuth)) {
     console.log('I am here, authentication checking, private page');
     // Check if user is Authenticated
     if(routerAuthCheck){
       // user is Authenticated - allow access
       console.log('Access granted, now we are logged in');
       next();
     }
     else{
       // user is not authenticated - redirect to login
       router.replace('/login');
     }
     
   }
   // Allow page to load 
   else{
     console.log('no authentication, public page');
     Store.commit('setUserIsAuthenticated', false);
     next();
   }
 });

export default router
