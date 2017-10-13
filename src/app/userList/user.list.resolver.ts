import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserListResolver implements Resolve<any> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        // let id = route.params['id'];
        // let id = '106540182994763924496';
        return this.userService.getUsers().then(usersList => {
            if (usersList) {
                return usersList;
            } else { // id not found
                // this.router.navigate(['/dashboard']);
                return null;
            };    
    });
}
}