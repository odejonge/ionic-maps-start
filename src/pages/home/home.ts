import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppSettings } from '../../app/app.settings'
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service'
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: string = 'AIzaSyBxx7qNPEJrsDUmTs20wv1lvkpg7sLwzBU';

  constructor(public navCtrl: NavController, 
              public connectivityService: ConnectivityService) {
    this.loadGoogleMaps();
  }

  loadGoogleMaps(){
    
    this.addConnectivityListeners();
  
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
  
      this.disableMap();
  
      console.log("Google maps JavaScript needs to be loaded.");
      if(this.connectivityService.isOnline()){
        console.log("online, loading map");
  
        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }
  
        let script = document.createElement("script");
        script.id = "googleMaps";
  
        if(this.apiKey){
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
        }
  
        document.body.appendChild(script);  
  
      } else {
        console.log("offline, can't load map yet");
      }
    }
    else {
  
      if(this.connectivityService.isOnline()){
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }
  
    }
  
  }
  
  initMap(){

    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    });

  }

  disableMap(){
    console.log("disable map");
  }

  enableMap(){
    console.log("enable map");
  }

  addConnectivityListeners(){

    let onOnline = () => {

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){

          this.loadGoogleMaps();

        } else {

          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }
  

  // ionViewDidLoad(){
  //   console.log("[home.ts] ionViewDidLoad()")
  //   this.loadMap();
  // }

  // loadMap(){
  //     let latLng = new google.maps.LatLng(AppSettings.MAP_INITIAL_LATITUDE, AppSettings.MAP_INITIAL_LONGITUDE);
  //     let mapZoomLevel = AppSettings.MAP_INITIAL_ZOOMLEVEL;


  //     let mapOptions = {
  //         center: latLng,
  //         zoom: mapZoomLevel,
  //         mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //     let infoWindow = new google.maps.InfoWindow();
  //     let map = this.map;
  //     let marker = new google.maps.Marker({
  //         map: this.map
  //     });
  //     let self = this;
  //     // Try HTML5 geolocation.
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(function(position) {
  //         var pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude
  //         };

  //         marker.setPosition(pos);
  //         map.setCenter(pos);
  //       }, function() {
  //           self.handleLocationError(true, infoWindow, map.getCenter());

  //       });
  //     } else {
  //       // Browser doesn't support Geolocation
  //       this.handleLocationError(false, infoWindow, map.getCenter());
  //     }
  // }


  // handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //   infoWindow.setPosition(pos);
  //   infoWindow.setContent(browserHasGeolocation ?
  //                         'Error: The Geolocation service failed.' :
  //                         'Error: Your browser doesn\'t support geolocation.');
  //   infoWindow.open(this.map);
  // }

}
