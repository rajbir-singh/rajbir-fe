import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service'
import { ConfigService } from '../services/ConfigService'
import { ActivatedRoute } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Utils }   from '../services/Utils';
import {Observable} from 'rxjs/Rx';
import { CoolLocalStorage } from "angular2-cool-storage";

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    providers: [UserService]
})

export class UserComponent implements OnInit{

    loggedInUser: any;
    loggedInUserCopy: any;
    isEditing = false;

    constructor(private localStorage: CoolLocalStorage, private configService: ConfigService, private changeDetectorRef: ChangeDetectorRef, private userService: UserService, private route: ActivatedRoute, private utils: Utils) {
        this.route.params.subscribe(params => {
            // const userId = params['id'];
            console.log('isEditing: ', this.isEditing);
            this.loggedInUser = this.route.snapshot.data['loggedInUser'];
        //     this.userService.getUserById(userId).then(result => { 
        //         this.loggedInUser = result.json().data;
        //         this.isEditing = false;
                // this.changeDetectorRef.detectChanges(); 
        //     });
          });
    }

    ngOnInit(): void {
        // Observable.interval(2000).subscribe(x => {
        //     this.isEditing = !this.isEditing;
        //   });
        
        console.log('loggedIn user: ', this.loggedInUser);
       
        // this.route.params.subscribe((params: {id: string}) => {
    }

    updateUser(): void {
        
        this.userService.updateUser(this.loggedInUserCopy)
        .then(user => {
            if(user) {
                this.loggedInUser = user.json().data;
        }
        else {
            return null;
        }
        this.isEditing = false;
    });
    }

    editUser(): void {
        this.isEditing = !this.isEditing;
        this.loggedInUserCopy = Object.assign({}, this.loggedInUser);
        // this.changeDetectorRef.detectChanges();
    }

    canEditUser(): boolean {
        return this.loggedInUser.userId === this.localStorage.getItem(this.configService.loggedInUserIdKey);
    }
}
