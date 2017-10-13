import { NgZone, Component, ChangeDetectorRef } from '@angular/core';
import { ConfigService } from './services/ConfigService';
import { Utils } from './services/Utils';
import { SignUpService } from './services/SignUpService'
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
declare var $:any;
declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isUserLoggedIn: boolean = false;
  constructor(private zone: NgZone, private changeDetectorRef: ChangeDetectorRef, private router: Router, private signUpService: SignUpService, private utils: Utils, private configService: ConfigService) {
    this.isUserLoggedIn = this.configService.isUserLoggedIn();
    // Observable.interval(2000).subscribe(x => {this.isUserLoggedIn = !this.isUserLoggedIn});
  }
  
  public auth2: any;
  public googleInit() {
    // gapi script must always be loaded, as signOut utility is always requied although signIn utility is not required always
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '769107420471-782b0i2f3dt9u05dhrb4j21g7ajglrg6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      var googleBtn = document.getElementById('googleBtn');
      if(googleBtn) {
        this.attachSignin(document.getElementById('googleBtn'));
      }
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

      this.zone.run(() => {
        this.signUpService.googleLogin(googleUser.getAuthResponse().id_token, 
        this.successCallback.bind(this), 
        this.signOut.bind(this)).then(
          function(data) {
            console.log(data);
          }
        );
      });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  successCallback = function (data) {
    localStorage.setItem(this.configService.loggedInUserIdKey, data.data.userId);
    this.configService.setLoggedInAccount(data.data);
    this.router.navigate(['/user/' + data.data.userId]);
    // this.changeDetectorRef.detectChanges();
    this.isUserLoggedIn = this.configService.isUserLoggedIn();
  }
  
  signOut = function signOut(ev) {
    localStorage.removeItem(this.configService.loggedInUserIdKey);
    this.isUserLoggedIn = this.configService.isUserLoggedIn();
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        // this.changeDetectorRef.detectChanges();
        this.googleInit();
        this.router.navigate(['login']);
      }.bind(this));
    }

ngAfterViewInit() {
  // if(!this.isUserLoggedIn()) {
      this.googleInit();
  // }
}

  onSignIn = function onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      var id_token = googleUser.getAuthResponse().id_token;
      // console.log('Id_token: ' + id_token); // Use this for Back End verificaion
      // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName());
      // console.log('Image URL: ' + profile.getImageUrl());
      // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      // SingUpSerivce.googleLoginUsingIdToken(id_token);
    }


}
