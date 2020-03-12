<template>
  <v-app class="nav2">
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn dark icon v-on="on" class="user-btn">
                <div class="log-user">
                    <v-img src="../../assets/images/user.png"></v-img>
                </div>
              </v-btn>
            </template>

            <v-list>
              
              <v-list-item class="mr-0" v-if="userAuthentication">
                    <v-list-item-avatar>
                        <img src="../../assets/images/user.png" alt="John">
                    </v-list-item-avatar>
  
                    <v-list-item-content left class="right-menu">
                        <v-list-item-title>{{ user_nickname }}</v-list-item-title>
                    </v-list-item-content>
              </v-list-item>
              <v-list-item class="mr-0 right-menu">
                <v-list-item-title @click="logout" v-if="userAuthentication" class="logout-user">
                    Logout
                    <div class="logout-border"></div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
        let name = localStorage.getItem('auth_details')
        this.user_nickname = name.charAt(0).toUpperCase() + name.slice(1);
  },
  methods:{
    logout(){
      authService.logout()
    }
  },
    watch: {
      group () {
        this.drawer = false
      }
    },
};
</script>

<style scoped>
/* .headline .text-uppercase {
  color: #222;
}
.v-list-item__icon {
  margin-right: 10px !important;
}
.v-list-item__title {
  font-size: 1rem !important;
  border-bottom: 1px solid gainsboro;
  padding: 8px 0;
  color: #222
}
.v-menu__content--fixed {
    top: 0 !important;
    right: 0 !important;
    width: 150px;
    left: auto !important;
}
.v-menu__content {
    top: 0px !important;
    right: 0px !important;
    transform-origin: left top !important;
    left: unset !important;
    z-index: 12 !important;
    width: 40%;
}
.v-navigation-drawer .v-list {
  padding: 0;
}
.nav2 {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  max-height: 40px;
  margin: 6px;
} */
</style>