import { Component, Vue } from 'vue-property-decorator';
import { SignalrWrapper } from "../signalrwrapper";
import { authService } from '../auth-service'

export function fetchWithAccessToken<T>(url: string): Promise<T> {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${authService.getAccessToken()}`);
    
    return fetch(url, {
            headers: headers
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error(response.statusText);
        }, error => {
            throw error;
        });
}

export function fetchPostWithAccessToken(url: string, jsonBody?: string): Promise<void> {
    const signalRConnectionId = localStorage.getItem('signalR_connectionId')!;

    const headers = new Headers();
    headers.set("Authorization", `Bearer ${authService.getAccessToken()}`);
    headers.set("SignalRConnectionId", signalRConnectionId);
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    
    return fetch(url, {
            headers: headers,
            method: "POST",
            body: jsonBody,
        })
        .then(response => {
            if (response.status === 200) {
                return;
            }
            if(response.status === 404) {
                throw Error("Not Found");
            }
        }, error => {
            console.log(error);
            throw error;
        });
}
