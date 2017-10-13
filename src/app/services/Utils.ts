import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ConfigService } from './ConfigService';
import { Router } from '@angular/router';
@Injectable()
export class Utils {
    constructor(private configService: ConfigService,
                private router: Router) {}
    
    isEmptyString = function(s: String) {
        return s === null || s === undefined || s === '';
    }
    
    redirectToLoginIfNotLoggedIn(): void {
        if(this.isEmptyString(localStorage.getItem(this.configService.loggedInUserIdKey))) {
            this.router.navigate(['login']);
        }
    }

    getCurrentDateTimeString(): string {
        var currentdate = new Date(); 
        return currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + " "
                + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();
    }
}