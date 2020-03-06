import $ from "jquery";
import environment from "./environment";
import { hubConnection } from 'signalr-no-jquery';

export class SignalREventHandler {
  constructor(public eventName: string, public callback: (...msg: any[]) => void) {}
  dispose() {
      this.callback != undefined;
  }
}

export enum SignalrConnectionState {
  connecting= 0,
  connected= 1,
  reconnecting= 2,
  disconnected= 4
}

// url without generated proxy - https://docs.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/hubs-api-guide-server#signalrurl
// signalr javascript client guide - https://docs.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client
export class SignalrWrapper {

  signalrConnection!: SignalR.Hub.Connection;
  reportingModuleHubProxy!: SignalR.Hub.Proxy;
  eventHandlers: SignalREventHandler[] = [];
  connectionStateChangedEventHandler !: {
    cancelled: boolean;
    handler: (change: SignalR.StateChanged) => void,
    cancel: () => void,
    onDisconnected: () => void
  };

  start() {
      this.signalrConnection = hubConnection(`${environment.apiBaseUrl}/signalr`,  {useDefaultPath: false});
      // this.signalrConnection.logging = true; // use a feature toggle here
      this.reportingModuleHubProxy = this.signalrConnection.createHubProxy('reportingModuleHub');
      this.reportingModuleHubProxy.on("dummyFunc", () => {});
      window.setTimeout(() => {
        return this.signalrConnection.start()
          .done(() => {
            console.log(["SignalR connected, connection ID:state:logging ",
              this.signalrConnection.id, SignalrConnectionState[this.signalrConnection.state], this.signalrConnection.logging]);
          })
          .fail(function () {
            console.log("Could not connect SignalR");
          });
      }, 0);
      this.connectionStateChangedEventHandler = this.getConnectionStateChangedEventHandler();
      this.signalrConnection.stateChanged(this.connectionStateChangedEventHandler.handler);
  }
  
  getConnectionStateChangedEventHandler() {
    const h = {
      cancelled: false,
      handler: (change: SignalR.StateChanged) => {},
      cancel: () => {},
      onDisconnected: this.onDisconnected
    };

    h.handler = (change: SignalR.StateChanged) => {
      console.log(`Connection state is: ${change.newState}, enum is: ${SignalrConnectionState[change.newState]}`);
      if(h.cancelled){
        console.log("disconnected");
        return;
      }
      if(change.newState === SignalrConnectionState.disconnected) {
        h.onDisconnected();
      }
    };

    h.cancel = () => {
      h.cancelled = true;
      h.onDisconnected != undefined;
    };

    return h;
  }

  onDisconnected = (): void => {
    console.log("onDisconnected Cleanup");
    this.disposeConnectionStateChangedEventHandler();
    console.log("onDisconnected stop previous connection");
    this.signalrConnection.stop();
    console.log("onDisconnected call start in 5 seconds");
    window.setTimeout(() => {
        console.log("onDisconnected calling start");
        this.start();
        console.log("onDisconnected re-subscribe event handlers");
        this.subscribeToHubEvents();
    }, 5000);
  }

  unsubscribeFromHubEvents = () => {
    for (let i = 0; i < this.eventHandlers.length; i++) {
        const eventHandler = this.eventHandlers[i];
        this.reportingModuleHubProxy.off(eventHandler.eventName, eventHandler.callback);
    }
  }

  subscribeToHubEvents = () => {
    for (let i = 0; i < this.eventHandlers.length; i++) {
        const eventHandler = this.eventHandlers[i];
        this.reportingModuleHubProxy.on(eventHandler.eventName, eventHandler.callback);
    }
  }

  disposeConnectionStateChangedEventHandler() {
    this.connectionStateChangedEventHandler.cancel();
    this.unsubscribeFromHubEvents();
    this.reportingModuleHubProxy != undefined;
  }

  dispose() {
    this.disposeConnectionStateChangedEventHandler();
    this.connectionStateChangedEventHandler != undefined;
    this.eventHandlers.forEach(eventHandler => eventHandler.dispose());
  }

  on(eventName: string, callback: (...msg: any[]) => void): void {
    this.eventHandlers.push(new SignalREventHandler(eventName, callback));
    this.reportingModuleHubProxy.on(eventName, callback);
  }

  off(eventName: string, callback: (...msg: any[]) => void): void {
    let eventHandlerToRemoveIndex = -1;
     for (let i = 0; i < this.eventHandlers.length; i++) {
          if (this.eventHandlers[i].eventName === eventName && this.eventHandlers[i].callback === callback) {
              eventHandlerToRemoveIndex = i;
              break;
          }
     }

    if (eventHandlerToRemoveIndex !== -1) {
      const eventHandlerToRemove = this.eventHandlers[eventHandlerToRemoveIndex];
      this.reportingModuleHubProxy.off(eventName, callback);
      eventHandlerToRemove.dispose();
      this.eventHandlers.splice(eventHandlerToRemoveIndex, 1);
    }
  }

  invoke(methodName: string, ...args: any[]): JQueryPromise<any> {
      return this.reportingModuleHubProxy.invoke.apply(this.reportingModuleHubProxy, [methodName,args]);
  }  
}