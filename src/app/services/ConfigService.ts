import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ConfigService {
    constructor(private http: Http) {}
    
    // beUrl = 'http://localhost:8080';
    beUrl = 'https://sprangular.herokuapp.com';
    loggedInUserIdKey = 'loggedInUserId';
    loggedInUserId: String = localStorage.getItem(this.loggedInUserIdKey);

    isUserLoggedIn(): boolean {
        let s: String = localStorage.getItem(this.loggedInUserIdKey);
        return !(s === null || s === undefined || s === '');
    }

    getLoggedInUserId(): String {
        return localStorage.getItem(this.loggedInUserIdKey);
    }

    setLoggedInUserId(userId: String): void {
        this.loggedInUserId = userId;
    }

    setLoggedInAccount(user: any): void {
        localStorage.setItem('loggedInAccount', JSON.stringify(user));
    }

    getLoggedInAccount(): any {
        return JSON.parse(localStorage.getItem('loggedInAccount'));
    }
}