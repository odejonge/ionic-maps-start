import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
 
declare var Connection;

@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
  public disconnect: boolean = false;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
    Network.onDisconnect().subscribe(() => {
      this.disconnect = true;
    });
    Network.onConnect().subscribe(() => {
      this.disconnect = false;
    });
  }

  
 
  isOnline(): boolean {
    if(this.onDevice ){
      return !this.disconnect;
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    return !this.isOnline();
  }
}
