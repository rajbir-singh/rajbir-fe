import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ConfigService } from '../services/ConfigService';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    //used put/post requests
    private headers = new Headers({'Content-Type': 'application/json'});
    private user = {
        "data": {
        "userId": "106540182994763924496",
        "name": "Rajbir Singh",
        "email": "rajbirs799@gmail.com",
        "mobile": null,
        "password": null,
        "groups": []
    }
};
    constructor(private http: Http, private configService: ConfigService) {}
    //TODO: use account instead of any
    getUserById(id: String) :any  {
        var googleLoginUrl = this.configService.beUrl + '/api/v1/user/' + id;
        return this.http.get(googleLoginUrl, {headers: this.headers})
        .toPromise();
    }

    updateUser(userDto: any): any {
        var updateUserUrl = this.configService.beUrl + '/api/v1/user/update';
        return this.http.post(updateUserUrl, userDto, {headers: this.headers}).toPromise();
    }

    getUsers(): any {
        var usersListUrl = this.configService.beUrl + '/api/v1/user/list';
        return this.http.get(usersListUrl, {headers: this.headers}).toPromise()
        .then(usersList => {
            return usersList.json().data
        }).catch(error => {
            console.log('Some error occurred while getting users list');
        });
    }

    searchUser(query: String): Observable<any[]> {
        var url = this.configService.beUrl + '/api/v1/user/search?query=' + query;
        return this.http.get(url, {headers: this.headers})
        .map(response => response.json().data as any[]);
    }

    private handleError(error: any): any {
        console.log('An error occurred', error); // for demo purposes only
        return;
      }
}