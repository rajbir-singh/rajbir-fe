import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/GroupService';
import { ConfigService } from '../services/ConfigService';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Utils }   from '../services/Utils';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { MdChipInputEvent } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'create-group',
    moduleId: module.id,
    templateUrl: 'add.group.html'
})

export class AddGroupComponent implements OnInit{

    constructor(private formBuilder: FormBuilder, private groupService: GroupService, private configService: ConfigService, private userService: UserService, private route: ActivatedRoute, private utils: Utils) { 
    }
    
    //Observable for search query
    private searchTerms = new Subject<string>();

    //form fields
    selectedUsers = [];
        
    removable: boolean = true;
    groupForm: FormGroup;

    createForm(): void {
      this.groupForm = this.formBuilder.group({
        userNameField: [''],
        groupName: ['', [Validators.required, Validators.minLength(3)]]
      });
    }

    // Push a search term into the observable stream.
    search(term: string): void {
      this.searchTerms.next(term);
    }
    
    filteredUsers: Observable<any[]>;

       ngOnInit() {
         //important: create form should be in ngOnInit(), and not in the constructer
         this.createForm();
           
          this.groupForm.get('userNameField').valueChanges
             .startWith(null)
             .forEach(term => {
                 if(!this.utils.isEmptyString(term)) {
                    this.search(term);
                 }
            });

            this.filteredUsers = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
              // return the http search observable
              ? this.userService.searchUser(term)
              // or the observable of empty heroes if there was no search term
              : Observable.of<any[]>([]))
            .catch(error => {
              // TODO: add real error handling
              console.log(error);
              return Observable.of<any[]>([]);
            });
       }

      addUser(user: any): void {
        this.groupForm.get('userNameField').setValue('', {onlySelf: true});
        if(this.selectedUsers.filter((selectedUser) => {
          return selectedUser.userId === user.userId;
         }).length > 0) {
          return;
         }
        this.selectedUsers.push(user);
       }

      removeUser(user): void {
         this.selectedUsers = this.selectedUsers.filter((selectedUser) => {
          return selectedUser.userId !== user.userId;
         });
       }

       //TODO: redirect to groupDetail page wiht the created groupData
       createGroup(): void {
         if(!this.groupForm.valid) {
          //  PopUps.Error('Please fix errors in form');
          return;
         }
         if(this.selectedUsers.length <= 0) {
          //  PopUps.Error('No of members of group should be greater than one.');
          return;
         }
         let createGroupDto = this.groupForm.value;
         createGroupDto.userIds = this.selectedUsers.map((selectedUser => {return selectedUser.userId;}));
         console.log('CreateGroupDto: ', createGroupDto);
         this.groupService.createGroup(createGroupDto).subscribe(
           (group) => {
             //TODO: redirect to groupDetail with group.groupId
            //  console.log('Successfully created group: ', group);
            },
           (error) => {
             console.log('Error: ', error);},
           () => {
             console.log('Completed GroupCreation');});
         }
}
