import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { ConfigService } from '../services/ConfigService';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignUpService {

    //used put/post requests
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private configService: ConfigService, private router: Router) {}
    //TODO: use account instead of any
    googleLogin(idToken, successCallback, errorCallback) :any  {
        var googleLoginUrl = this.configService.beUrl + '/api/v1/googleLogin/login?googleIdToken=' + idToken;
        return this.http.get(googleLoginUrl, {headers: this.headers})
        .toPromise()
        .then(response => successCallback(response.json()))
        .catch(error => errorCallback(error));
    }

    // create(name: string): Promise<Hero> {
    //     return this.http
    //       .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    //       .toPromise()
    //       .then(res => res.json().data as Hero)
    //       .catch(this.handleError);
    //   }

    // add(name: string): void {
    //     name = name.trim();
    //     if (!name) { return; }
    //     this.heroService.create(name)
    //       .then(hero => {
    //         this.heroes.push(hero);
    //         this.selectedHero = null;
    //       });
    //     }
      

    private handleError(error: any): any {
        console.log('An error occurred', error); // for demo purposes only
        return;
        // return Promise.reject(error.message || error);
      }
}