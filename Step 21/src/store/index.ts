import Vue from 'vue'
import Vuex from 'vuex'
import auth0 from 'auth0-js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reportStatus: null,
    userIsAuthorized:false,
    auth0: new auth0.WebAuth({
      domain: 'dev-nuzfq563.au.auth0.com', 
      clientID: 't2EnCZzuuyoQsCPPt84djJ005zz9utwq',
      redirectUri:  'http://localhost:8080' + '/auth0callback',  
      responseType: 'token id_token',
      scope: 'openid email',
    }),
  },
  mutations: {
    setUserIsAuthenticated(state, replacement){
      state.userIsAuthorized = replacement;
    }
  },
  actions: {
    auth0Login(context){
      context.state.auth0.authorize();
    },
    auth0HandleAuthentication (context) {
      context.state.auth0.parseHash((err: any, authResult: any) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          )
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('expires_at', expiresAt);  

          router.replace('/home');
        } 
        else if (err) {
          router.replace('/login');
        }
      })
    },
    auth0Logout (context) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      window.location.href = process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL + "/v2/logout?returnTo=" + process.env.VUE_APP_DOMAINURL + "/login&client_id=" + process.env.VUE_APP_AUTH0_CONFIG_CLIENTID; 
    },  
  },
  modules: {
  }
})
