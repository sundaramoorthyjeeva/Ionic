import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private push: Push, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.handlePushNotification();
  }

  public handlePushNotification() {
    const options: PushOptions = {
      android: {
        senderID: 'xxxxxxxxxxxx'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
            console.log('device token -> ' + data.registrationId);
            //Use this device token to send push from FCM...
        });

    //Receiving notification data..
    pushObject.on('notification').subscribe((data: any) => {  
      
        let jsonStr = JSON.stringify(data); 
        let json = JSON.parse(jsonStr);
        
        alert("Title : " + json.title + "\n" + "Message : " + json.message);  
        
    });
    
  }

  //I assumed it is the callback of notification action button. But callback not getting called.
  public approve(){
    alert('Approve');
  }

  //I assumed it is the callback of notification action button. But callback not getting called.
  public reject(){
    alert('Reject');  
  }

}

