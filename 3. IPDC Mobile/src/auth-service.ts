import { WebAuth, Auth0DecodedHash, Auth0Error } from "auth0-js";
// import { autoinject } from "aurelia-framework";
//import VueRouter from 'vue-router'
import router from './router'
import { EventEmitter } from "events";
import jwtDecode from "vue-jwt-decode";
import moment from "vue-moment";
import env from "./environment";

const fiveMinuteInterval = 5 * 60 * 1000;
const fifteenMinuteInterval = 15 * 60 * 1000;
const idTokenKey = "id_token";
const idTokenExpiresAtKey = "id_token_expires_at";
const idTokenExpiresAtDateTimeKey = "id_token_expires_at_datetime";
const accessTokenKey = "access_token";
const accessTokenExpiresAtKey = "access_token_expires_at";
const accessTokenExpiresAtDateTimeKey = "access_token_expires_at_datetime";
const locationKey = "location";
const claimNamespace = "https://reportingmodule.com/claims";

//@autoinject
class AuthService {

  authNotifier = new EventEmitter();

  auth0 = new WebAuth({
    domain: env.auth0.domain,
    clientID: env.auth0.clientId,
    redirectUri: `http://${env.auth0.base}/auth0callback`,
    audience: env.auth0.audience,
    responseType: "token id_token",
    scope: "openid email",
  });

  // constructor(private router: VueRouter) {    
  // }

  // setAccessTokenRefresh() {
  //   let timeoutId = setInterval(() => {
  //     if (this.isAuthenticated) {
  //       let expiresAt = JSON.parse(window.localStorage.getItem(accessTokenExpiresAtKey)!);
  //       if (expiresAt) {
  //         let currentTime = new Date().getTime();
  //         if  ((expiresAt  - currentTime) < fifteenMinuteInterval) {
  //           this.refresh();
  //         }
  //       }
  //     }
  //   }, fiveMinuteInterval);
  // }

  // refresh() {
  //   this.auth0.checkSession({}, (err: Auth0Error, result: Auth0DecodedHash) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       this.setSession(result);
  //     }
  //   });
  // }

  login(): void {
    //const savedurl = this.router.currentInstruction.fragment.endsWith("/Welcome") ? "/dashboard" : this.router.currentInstruction.fragment;
    //window.localStorage.setItem(locationKey, JSON.stringify({ url: savedurl }));
    console.log('calling');
    this.auth0.authorize();
  }

  handleAuthentication(): void {
    console.log('calling next');
    this.auth0.parseHash((err, authResult) => {
      console.log('test - ' + authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
       // this.setSession(authResult);
       window.localStorage.setItem(accessTokenKey, authResult.accessToken!);
        //const savedLocation = JSON.parse(window.localStorage.getItem(locationKey));
        //const navigateTarget = savedLocation.url || 'dashboard';
        console.log('calling next1');
        router.replace('/dashboard');
  
        this.authNotifier.emit('authChange', { authenticated: true });
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession(authResult: Auth0DecodedHash): void {
    
    // const idTokenExpiresAt = authResult.expiresIn! * 1000 + new Date().getTime();
  
    // window.localStorage.setItem(idTokenKey, authResult.idToken!);
    // window.localStorage.setItem(idTokenExpiresAtKey, JSON.stringify(idTokenExpiresAt));
    // window.localStorage.setItem(idTokenExpiresAtDateTimeKey, JSON.stringify(moment(idTokenExpiresAt).toDate()));
    
    // let decodedAccessToken: any = jwtDecode(authResult.accessToken);
    // let accessTokenExpiresAt = decodedAccessToken.exp * 1000;
    // window.localStorage.setItem(accessTokenKey, authResult.accessToken!);
    // window.localStorage.setItem(accessTokenExpiresAtKey, JSON.stringify(accessTokenExpiresAt));
    // window.localStorage.setItem(accessTokenExpiresAtDateTimeKey, JSON.stringify(moment(accessTokenExpiresAt).toDate()));    
  }

  get isAuthenticated(): boolean {
    const accessToken = window.localStorage.getItem(accessTokenKey);
    const expiresAt = window.localStorage.getItem(idTokenExpiresAtKey);
    if (!expiresAt || !accessToken)
      return false;
  
    const authenticated = new Date().getTime() < JSON.parse(expiresAt);
    return authenticated;
  }

  logout(): void {
    window.localStorage.removeItem(accessTokenKey);
    window.localStorage.removeItem(idTokenKey);
    window.localStorage.removeItem(idTokenExpiresAtKey);
    window.localStorage.removeItem(idTokenExpiresAtDateTimeKey);
    window.localStorage.removeItem(accessTokenExpiresAtKey);
    window.localStorage.removeItem(accessTokenExpiresAtDateTimeKey);
  
    this.authNotifier.emit('authChange', { authenticated: false });
    this.auth0.logout({
      clientID: env.auth0.clientId,
      returnTo: env.auth0.returnTo
    });
  }

  getAccessToken(): string {
    const accessToken = window.localStorage.getItem(accessTokenKey);
    return accessToken!;
  }

  get username(): string {
    if(!this.isAuthenticated) return null!;
    const idToken = jwtDecode(window.localStorage.getItem(idTokenKey));
    return idToken[`${claimNamespace}/username`]
  }

  get isSystemAdmin(): boolean {
    if(!this.isAuthenticated) return false;
    const idToken = jwtDecode(window.localStorage.getItem(idTokenKey));
    return idToken[`${claimNamespace}/IsSystemAdmin`]
  }

  // get roles(): string[] {
  //   return [].concat(this.isSystemAdmin ? ["sysadmin"] : []);
  // }
}
export const authService = new AuthService();