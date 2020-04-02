<template>
  <v-app class="navbar">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="userAuthentication"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="logo-section">
        <img src="../../assets/images/nav-logo.png" alt="Logo">
      </div>
      <v-toolbar-title class="headline">
        <span> {{ $route.name}} </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn dark icon v-on="on" class="user-btn">
                <div class="log-user">
                    <i class="fas fa-user user-icon"></i>
                </div>
              </v-btn>
            </template>

            <v-list>
              <v-list-item class="mr-0" v-if="userAuthentication">
                    <v-list-item-avatar>
                      <i class="fas fa-user user-icon"></i>
                    </v-list-item-avatar>
  
                    <v-list-item-content left class="right-menu">
                        <v-list-item-title>{{ user_nickname }}</v-list-item-title>
                    </v-list-item-content>
              </v-list-item>
              <v-list-item class="mr-0 right-menu">
                <v-list-item-title @click="logout" v-if="userAuthentication" class="logout-user">
                  <div class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</div>
                </v-list-item-title>
                <v-list-item-title @click="login" v-else>
                    Login
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </v-app-bar>

    

        <v-navigation-drawer v-model="drawer" absolute left temporary>
          <v-list nav dense>
            <v-list-item-group v-model="group">
            <v-list-item>
              <v-img src="../../assets/images/ipdc.jpg"></v-img>
            </v-list-item>

            <v-list-item class="mr-0" @click="dashboardClick">
              <div class="v-list-item__icon side-menu-icon">
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-home theme--light"></i>
              </div>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>

            <v-list-item class="mr-0" @click="planAndReportClick">
              <div class="v-list-item__icon side-menu-icon">
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-note theme--light"></i>
              </div>  
              <v-list-item-title>Plan &amp; Reports</v-list-item-title>
            </v-list-item>

            <v-list-item class="mr-0" @click="supportClick">
              <div class="v-list-item__icon side-menu-icon">
                <i aria-hidden="true" class="v-icon support-icon notranslate fas fa-tools fa-2x theme--light"></i>
              </div>
              <v-list-item-title>Support</v-list-item-title>
            </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
  </v-app>
</template>

<script>
import { authService } from '../../auth-service'

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
      userAuthentication: false
    }
  },
  created() {
    this.userAuthentication = authService.isAuthenticated
  },
  updated() {
    this.userAuthentication = authService.isAuthenticated
    if(localStorage.getItem('auth_details')) {
      let name = localStorage.getItem('auth_details')
      this.user_nickname = name.charAt(0).toUpperCase() + name.slice(1);
    }
  },
  methods:{
    logout(){
      document.querySelector('.navbar').classList.remove('hide')
      authService.logout()
    },
    login(){
      authService.login()
    },
    dashboardClick() {
      if(!document.querySelector('.dashboard')) this.$router.push('/dashboard')
    },
    planAndReportClick() {
      if(!document.querySelector('.plan-and-reports')) this.$router.push('/plan-and-reports')
    },
    supportClick() {
      if(!document.querySelector('.support')) this.$router.push('/support')
    },
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
};
</script>