<template>
  <v-app class="nav2">
    <v-btn dark icon class="user-btn">
      <div class="log-user" @click="actionSheetVisible = true"><i class="fas fa-user user-icon"></i></div>
    </v-btn>
    <v-ons-action-sheet :visible.sync="actionSheetVisible" cancelable class="nav2-inner">
      <div class="nav2-sec sec">
        <div class="nav2-container">
          <div class="list-item">
            <div class="image-sec"><i class="fas fa-user user-icon"></i></div>
            <div class="user-title-sec"><div class="user-title">{{ user_nickname }}</div></div>
          </div>
          <div class="list-item">
            <div class="logout-user" @click="logout" v-if="userAuthentication">
              <div class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</div>
            </div>
          </div>
        </div>
      </div>
    </v-ons-action-sheet>
  </v-app>
</template>

<script>
import { authService } from '../../auth-service'
import $ from 'jquery'
import App from '../../App'

export default {
  components: {
  },
  data () {
    return {
      clientId: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
      drawer: false,
      group: null,
      componentName: null,
      user_nickname: '',
      userAuthentication: false,
      actionSheetVisible: false
    }
  },
  created() {
    this.userAuthentication = authService.isAuthenticated
    if(localStorage.getItem('auth_details')) {
      let name = localStorage.getItem('auth_details')
      this.user_nickname = name.charAt(0).toUpperCase() + name.slice(1);
    }
  },
  mounted() {
  },
  methods:{
    logout(){
      document.querySelector('.navbar').classList.remove('hide')
      authService.logout()
    },
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
};
</script>