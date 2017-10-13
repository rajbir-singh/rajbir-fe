import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Utils } from '../services/Utils';
import { ConfigService } from '../services/ConfigService';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserResolver implements Resolve<any> {

    constructor(private configService: ConfigService, private utils: Utils, private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        let id = route.params['id'];
        if(this.utils.isEmptyString(id) || id === 'null'){
            id = this.configService.getLoggedInUserId();
        }
        // let id = '106540182994763924496';
        return this.userService.getUserById(id).then(hero => {
            if (hero) {
                return hero.json().data;
            } else { // id not found
                // this.router.navigate(['/dashboard']);
                return null;
            };    
    });
}
}