import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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
    constructor(private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService,
        private route: ActivatedRoute,
        private utils: Utils,
        private router: Router) {
    }

    ngOnInit(): void {
        this.tableData1 = {
            headerRow: [ 'ID', 'Name', 'Email', 'Mobile', 'About User'],
            dataRows: []
        };
        this.usersList = this.route.snapshot.data['usersList'];
        console.log(this.usersList);
        // this.usersList.array.forEach(userRow => {
            
        // });
    }

    goToUserDetails(userId: String): void {
        this.router.navigate(['user', userId]);
    }

}
