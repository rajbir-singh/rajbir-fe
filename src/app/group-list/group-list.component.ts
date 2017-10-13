import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { GroupService } from '../services/GroupService'
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Utils }   from '../services/Utils';
import { Observable } from 'rxjs/Rx';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
  providers: [GroupService]
})

export class GroupListComponent implements OnInit{

    groupList: any;
    tableData1: TableData;
    constructor(private changeDetectorRef: ChangeDetectorRef,
        private groupService: GroupService,
        private route: ActivatedRoute,
        private utils: Utils,
        private router: Router) {
    }

    ngOnInit(): void {
        this.tableData1 = {
            headerRow: [ 'ID', 'Name', 'Members'],
            dataRows: []
        };
        this.groupList = this.route.snapshot.data['groupList'];
        this.initUserNamesString();
        console.log(this.groupList);
        // this.groupList.array.forEach(userRow => {
            
        // });
    }

    initUserNamesString(): void {
        let userNamesString = '';
        this.groupList.forEach(function(group) {
            if(group.users !== null && group.users !== undefined && group.users.length !== 0) {
                userNamesString = group.users[0].name || '';
            for(let i = 1; i < group.users.length; i++) {
                userNamesString += ', ' + group.users[i].name;
            }
        }
            group.userNamesString = userNamesString;
        });
    }

    goToGroupDetails(groupId: String): void {
        this.router.navigate(['group', groupId]);
    }

}



