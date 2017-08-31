/**
 * Created by Olivier
 */
export class AppSettings {
  
      private static BASE_URL: string = window.location.origin + "/";
      //private static BASE_URL: string = "http://172.16.221.1/";
      //private static BASE_URL: string = "http://192.168.1.111/";
      //private static BASE_URL: string = "http://192.168.2.17/";
      //private static BASE_URL:string = "https://angular.luminizer.nl/";
      //private static BASE_URL: string = "http://rob.luminext.eu/";
  
      public static MAP_INITIAL_LATITUDE: number = 52.117;
      public static MAP_INITIAL_LONGITUDE: number = 5.409;
      public static MAP_INITIAL_ZOOMLEVEL: number = 8;
  
      //Clientside routing constants
      public static INITIAL_PAGE: string = 'home';
      public static LOGIN_PAGE: string = 'app.component';
      public static FORBIDDEN_PAGE: string = 'forbidden';
      public static DASHBOARD_PAGE: string = 'dashboard';
  
      //All colors are defined in CSS, but in some special cases they are needed here in angular
      public static COLOR_YELLOW: string = 'ffc463';
      public static COLOR_GREEN: string = '5ed183';
      public static COLOR_RED: string = 'ff7b63';
      public static COLOR_BLUE: string = '508ec9';
      public static COLOR_PURPLE: string = 'cb79cb';
      public static COLOR_GREY: string = '939393';
      public static COLOR_TURQUUOISE: string = '50c2c9'; //Nog niet definitief
  
  
      static get baseUrl(): string {
          if (window.location.host === 'localhost'
              || window.location.host.indexOf('192.168') >= 0
              || this.BASE_URL.indexOf('172.16') >= 0
              || this.BASE_URL.indexOf('192.168') >= 0
              || this.BASE_URL.indexOf('rob') >= 0) {
              return this.BASE_URL + 'app_dev2.php/';
          }
          return this.BASE_URL;
      }
  
  
  }