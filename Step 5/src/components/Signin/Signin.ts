import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './sign-in.html';
import { authService } from '../../auth-service'

@WithRender

@Component
export default class SignIn extends Vue {
    isAuthenticated = false;
    auth = authService;
    constructor() { super()
        this.isAuthenticated = this.auth.isAuthenticated;   
        this.auth.authNotifier.addListener('authChange', this.authChangeHandler);
    }

    private authChangeHandler(state : any) {
        this.isAuthenticated = state.authenticated;
    }

    attached(){
    }

    Ilogin() {
        authService.login();
         //this.$store.dispatch('auth0Login')
    }
  }
