import { Component, NgZone, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Utils }   from '../services/Utils';
import { Observable } from 'rxjs/Rx';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'user-list',
    moduleId: module.id,
    templateUrl: 'user.list.component.html',
    providers: [UserService]
})

export class UserListComponent implements OnInit{

    usersList: any;
    tableData1: TableData;
    dat: any[]
    constructor(private zone:NgZone, private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService,
        private route: ActivatedRoute,
        private utils: Utils,
        private router: Router) {
    }

    ngOnInit(): void {
        // this.dat = ['Name', 'Email', 'Mobile', 'About User'];
        this.tableData1 = {
            // headerRow: [ 'ID', 'Name', 'Email', 'Mobile', 'About User'],
            headerRow: ['Name', 'Email', 'Mobile', 'Qualification', 'Occupation', 'Income', 'Height', 'Weight', 'Details'],
            dataRows: []
        };
        this.usersList = this.route.snapshot.data['usersList'].content;
        // this.usersList.forEach(user => {
        //     if(user.addresses.length >= 1) {
        //         user['city'] = user.addresses[0].city;
        //     }
        // });
        // console.log(this.usersList);
        // this.usersList.array.forEach(userRow => {
            
        // });
    }

    goToUserDetails(userId: String): void {
        this.router.navigate(['user', userId]);
    }

}
