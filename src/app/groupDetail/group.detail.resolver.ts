import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GroupService } from '../services/GroupService';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GroupDetailResolver implements Resolve<any> {

    constructor(private groupService: GroupService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        let groupId = route.params['id'];
        // let id = '106540182994763924496';
    //     return this.groupService.getGroupDetail(groupId).subscribe(;
    //     .then(groupDetail => {
    //         if (groupDetail) {
    //             return groupDetail;
    //         } else { // id not found
    //             // this.router.navigate(['/dashboard']);
    //             return null;
    //         };    
    // });
}
}