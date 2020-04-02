import { WebAuth, Auth0DecodedHash, Auth0Error } from "auth0-js";
// import { autoinject } from "aurelia-framework";
//import VueRouter from 'vue-router'
import router from './router'
import { EventEmitter } from "events";
import jwtDecode from "jwt-decode";
import moment from "moment";
import env from "./environment";

const fiveMinuteInterval = 5 * 60 * 1000;
const fifteenMinuteInterval = 15 * 60 * 1000;
// const authDetails = "auth_details";
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
  err !: Auth0Error;
  result !: Auth0DecodedHash;
  auth0 = new WebAuth({
    domain: env.auth0.domain,
    clientID: env.auth0.clientId,
    redirectUri: `http://${env.auth0.base}/auth0callback`,
    audience: env.auth0.audience,
    responseType: "token id_token",
    scope: "openid profile email",
  });

  // constructor(private router: VueRouter) {    
  // }

  setAccessTokenRefresh() {
    let timeoutId = setInterval(() => {
      if (this.isAuthenticated) {
        let expiresAt = JSON.parse(window.localStorage.getItem(accessTokenExpiresAtKey)!);
        if (expiresAt) {
          let currentTime = new Date().getTime();
          if  ((expiresAt  - currentTime) < fifteenMinuteInterval) {
            this.refresh();
          }
        }
      }
    }, fiveMinuteInterval);
  }

  refresh() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    });
  }

  login(): void {
    this.auth0.authorize();
  }

  handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
       this.setSession(authResult);
        this.authNotifier.emit('authChange', { authenticated: true });
        // router.replace('/dashboard');
        router.replace('/plan-and-reports');
      } else if (err) {
      }
    });
  }

  setSession(authResult: Auth0DecodedHash): void {
    const idTokenExpiresAt = authResult.expiresIn! * 1000 + new Date().getTime();
    window.localStorage.setItem('auth_details', authResult.idTokenPayload.nickname);
    window.localStorage.setItem(idTokenKey, authResult.idToken!);
    window.localStorage.setItem(idTokenExpiresAtKey, JSON.stringify(idTokenExpiresAt));
    window.localStorage.setItem(idTokenExpiresAtDateTimeKey, JSON.stringify(moment(idTokenExpiresAt).toDate()));
    window.localStorage.setItem(idTokenExpiresAtDateTimeKey, JSON.stringify(idTokenExpiresAt));
    let decodedAccessToken: any = jwtDecode(authResult.accessToken);
    let accessTokenExpiresAt = decodedAccessToken.exp * 1000;
    window.localStorage.setItem(accessTokenKey, authResult.accessToken!);
    window.localStorage.setItem(accessTokenExpiresAtKey, JSON.stringify(accessTokenExpiresAt));
    window.localStorage.setItem(accessTokenExpiresAtDateTimeKey, JSON.stringify(moment(accessTokenExpiresAt).toDate()));    
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
    window.localStorage.removeItem('auth_details');
    window.localStorage.removeItem(idTokenKey);
    window.localStorage.removeItem(idTokenExpiresAtKey);
    window.localStorage.removeItem(idTokenExpiresAtDateTimeKey);
    window.localStorage.removeItem(accessTokenExpiresAtKey);
    window.localStorage.removeItem(accessTokenExpiresAtDateTimeKey);
  
    this.authNotifier.emit('authChange', { authenticated: false });
    window.location.href = `https://${env.auth0.domain}` + "/v2/logout?returnTo=" + `http://${env.auth0.base}` + "/sign-in&client_id=" + env.auth0.clientId; 
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
}
export const authService = new AuthService();