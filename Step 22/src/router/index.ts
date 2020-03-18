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
    name: '',
    component: Auth0Callback,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/plan-and-reports',
    name: 'Plan and Reports',
    component: () => import('../components/PlanAndReports/PlanAndReports.vue'),
    meta: { requiresAuth: true }
  },
  // PlanAndReports - Support Swip
  {//using swip
    path: '/plan-support',
    name: 'Plan and Support',
    component: () => import('../components/PlanSupportSwip/PlanSupportSwip.vue'),
    meta: { requiresAuth: true }
  },
  // PlanAndReports - Support Swip
  {
    path: '/support',
    name: 'Support',
    component: () => import('../components/Support/Support.vue')
  },
  {
    path: '/admin/create-plan',
    name: 'Copy Plan', //Create
    component: () => import('../components/CreatePlan/CreatePlan.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/sign-in',
    name: 'Sign in',
    component: () => import('../components/Signin/Signin.vue')
  },
  {
    path: '/report-landing-plan',
    name: '',
    component: () => import('../components/ReportLandingSwip/ReportLandingPlan.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/report-landing-swip',
    name: '',
    component: () => import('../components/ReportLandingSwip/ReportLanding.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/report-landing-swip-report',
    name: '',
    component: () => import('../components/ReportLandingSwip/ReportLanding.vue'),
    meta: { requiresAuth: true }
  },
  // Manpower Swip
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts',
    name: 'Manpower And Personal Contact',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Manpower 
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts/member',
    name: 'Member',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts/associate-member',
    name: 'Associate Member',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts/preliminary-member',
    name: 'Preliminary Member',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/manpower-and-personal-contacts/supporter-member',
    name: 'Supporter Member',
    component: () => import('../components/PlanAndReportFields/ManpowerAndPersonalContacts/ManPowerSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Manpower 
  // Regular and Special Meetings Swip
  {
    path: '/plan-and-report-edit/regular-and-special-meetings',
    name: 'Regular and Special Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Regular and Special Meetings
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/worker-meetings',
    name: 'Worker Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/cms-meetings',
    name: 'CMS Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/sm-meetings',
    name: 'SM Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/member-meetings',
    name: 'Member Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/dawah-meetings',
    name: 'Dawah Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/state-leader-meetings',
    name: 'State Leader Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/state-outing',
    name: 'State Outing',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/iftar-gathering',
    name: 'Iftar Gathering',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/learning-meetings',
    name: 'Learning Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/social-dawa-program',
    name: 'Social Dawah Programs',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/dawa-group',
    name: 'Dawah group',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/next-g-meeting',
    name: 'NextG Meeting',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/tafsir-meetings',
    name: 'Tafsir Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/unit-meetings',
    name: 'Unit Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/bbq-meetings',
    name: 'BBQ Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/gathering-meetings',
    name: 'Gathering Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/family-visit-meetings',
    name: 'Family Visit Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/eid-re-union-meetings',
    name: 'Eid Re-Union Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/regular-and-special-meetings/other-meeting',
    name: 'Other Meetings',
    component: () => import('../components/PlanAndReportFields/RegularAndSpecialMeetings/MeetingsSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Regular and Special Meetings
  // Teaching and Learning Program Swip
  {
    path: '/plan-and-report-edit/teaching-and-learning-program',
    name: 'Teaching &amp; Learning Program',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Teaching and Learning Program
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/group-study-discussion',
    name: 'Group Study Discussion',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/study-circle',
    name: 'Study Circle',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/study-circle-am',
    name: 'Study Circle AM',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/practice-darsSpeech',
    name: 'Practice DarsSpeech',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/state-learning-camp',
    name: 'State Learning Camp',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/quran-study',
    name: 'Quran Study',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/hadith-study',
    name: 'Hadith Study',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/quran-class',
    name: 'Quran Class',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/weekend-islamic-school',
    name: 'Weekend Islamic School',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/memorizing-ayat',
    name: 'Memorizing Ayat',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/memorizing-hadith',
    name: 'Memorizing Hadith',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/memorizing-doa',
    name: 'Memorizing Doa',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/state-learning-session',
    name: 'State Learning Session',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/state-qiyamul-lail',
    name: 'State Qiyamul Lail',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/teaching-and-learning-program/other',
    name: 'Other',
    component: () => import('../components/PlanAndReportFields/TeachingAndLearningProgram/TeachingLearningSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Teaching and Learning Program
  // Dawah Material Distribution Swip
  {
    path: '/plan-and-report-edit/dawah-material-distribution',
    name: 'Dawah Material Distribution',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Dawah Material Distribution
  {
    path: '/plan-and-report-edit/dawah-material-distribution/book-sale',
    name: 'Book Sale',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/dawah-material-distribution/book-distribution',
    name: 'Book Distribution',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/dawah-material-distribution/audio-sale',
    name: 'Audion sale',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/dawah-material-distribution/audio-distribution',
    name: 'Audio Distribution',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/dawah-material-distribution/email-distribution',
    name: 'Email Distribution',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/dawah-material-distribution/ipdc-leaflet-distribution',
    name: 'IPDC Leaflet Distribution',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/dawah-material-distribution/other-sale',
    name: 'Other Sale',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/dawah-material-distribution/other-distribution',
    name: 'Other Distribution',
    component: () => import('../components/PlanAndReportFields/DawahMaterialDistribution/DawahDistributionSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Dawah Material Distribution
  // Finance Swip
  {
    path: '/plan-and-report-edit/finance',
    name: 'Finance',
    component: () => import('../components/PlanAndReportFields/Finance/FinanceSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Finance
  {
    path: '/plan-and-report-edit/finance/baitul-mal',
    name: 'Baitulmal',
    component: () => import('../components/PlanAndReportFields/Finance/FinanceSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/finance/masjid-project',
    name: 'Masjid Project',
    component: () => import('../components/PlanAndReportFields/Finance/FinanceSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/finance/masjid-table-bank',
    name: 'Masjid Table Bank',
    component: () => import('../components/PlanAndReportFields/Finance/FinanceSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Finance
  // Social Welfare Swip
  {
    path: '/plan-and-report-edit/social-welfare',
    name: 'Social Welfare',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Social Welfare
  {
    path: '/plan-and-report-edit/social-welfare/Qard-e-Hasana',
    name: 'Qard-e-Hasana',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/social-welfare/Patient-Visit',
    name: 'Patient Visit',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/social-welfare/Social-Visit',
    name: 'Social Visit',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/social-welfare/Transport',
    name: 'Transport',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/social-welfare/Shifting',
    name: 'Shifting',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/social-welfare/Shopping',
    name: 'Shopping',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/social-welfare/food-distribution',
    name: 'Food Distribution',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/social-welfare/Clean-Up',
    name: 'Clean Up',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/social-welfare/Other',
    name: 'Other',
    component: () => import('../components/PlanAndReportFields/SocialWelfare/SocialWelfareSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Social Welfare
  // Other Swip(Report)
  {
    path: '/plan-and-report-edit/other',
    name: 'Other',
    component: () => import('../components/PlanAndReportFields/Others/OtherSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Other (Report)
  {
    path: '/plan-and-report-edit/other/book-library',
    name: 'Book Library',
    component: () => import('../components/PlanAndReportFields/Others/OtherSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/other/other-library',
    name: 'Other Library',
    component: () => import('../components/PlanAndReportFields/Others/OtherSwip.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plan-and-report-edit/other/audio-library',
    name: 'Audio Library',
    component: () => import('../components/PlanAndReportFields/Others/OtherSwip.vue'),
    meta: { requiresAuth: true }
  },
  // Other (Report)
  // Onsen Test
  {
    path: '/onsen-test',
    name: 'Onsen Test',
    component: () => import('../components/OnsenTest/Support.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( (to,from,next)=>{
  if(to.matched.some(record=>record.path == "/auth0callback")){
   authService.handleAuthentication();
   next(false);
 }
  let routerAuthCheck = false;  
  if( localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('id_token_expires_at') ){
    let expiresAt = JSON.parse(localStorage.getItem('id_token_expires_at')!);
    routerAuthCheck = new Date().getTime() < expiresAt;  
  }
   Store.commit('setUserIsAuthenticated', routerAuthCheck);
   if (to.matched.some(record => record.meta.requiresAuth)) {
     if(routerAuthCheck){
       next();
     }
     else{
      router.replace('/sign-in');
     }
   }
   else{
     Store.commit('setUserIsAuthenticated', false);
     next();
   }
 });

export default router
