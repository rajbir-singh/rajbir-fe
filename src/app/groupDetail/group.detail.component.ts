import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/GroupService';
import { ConfigService } from '../services/ConfigService';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { FirebaseApp } from 'angularfire2';

import { FormsModule, FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { Utils }   from '../services/Utils';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../services/message.service';

// import { Subject }           from 'rxjs/Subject';
// import { MdChipInputEvent } from '@angular/material';

// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// // Observable class extensions
// import 'rxjs/add/observable/of';

// Observable operators
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'group-detail',
    moduleId: module.id,
    templateUrl: 'group.detail.html',
    styleUrls: ['./group.detail.css']
})

//TODO: check the difference between keeping posts ref in groupDetialComponent rather than in a service 
export class GroupDetailComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private groupService: GroupService,
      private configService: ConfigService,
      private userService: UserService, 
      private utils: Utils,
      private messageService: MessageService,
      private router: Router) { 
    }
    
    // //Observable for search query
    // private searchTerms = new Subject<string>();

    // //form fields
    // private selectedUsers = [];
        
    // removable: boolean = true;
    // private groupForm: FormGroup;

    // createForm(): void {
    //   this.groupForm = this.formBuilder.group({
        
    //     userNameField: [''],
    //     groupName: ['', [Validators.required, Validators.minLength(3)]]
    //   });
    // }

    // // Push a search term into the observable stream.
    // search(term: string): void {
    //   this.searchTerms.next(term);
    // }
    private groupId: number;

    private groupDetail: any;

    private postForm: FormGroup;

    private isPostingFlag: boolean = false;

    // All the statuses available
    public posts: FirebaseListObservable<any[]>;
    
    private loggedInUser = this.configService.getLoggedInAccount();

    // private posts: []<any>;
    
    createForm(): void {
      this.postForm = this.formBuilder.group({
        newMessage: ['', [Validators.required, Validators.minLength(1)]]
      });
    }

    postMessage(): void {
      let postMessage = this.postForm.get('newMessage').value;
      if(this.utils.isEmptyString(postMessage)) {
        // PopUps.error('Can\'nt post empty message');
        return;
      }

      let post = {
        'message': postMessage,
        'time': this.utils.getCurrentDateTimeString(),
        'byUserId': this.loggedInUser.userId,
        'byUserName': this.loggedInUser.name,
        'groupId': this.groupId
      };
      if ( ! this.isPosting()) {
        this.isPostingFlag = true;
        let payload = post;
        this.posts.push(payload).then( snapshot => {
          this.isPostingFlag = false;
          this.postForm.get('newMessage').setValue('');
        }).catch(error => {
          this.isPostingFlag = false;
          console.error('Some error occure while posting: ', error);
        });
      }
      // this.messageService.post(postMessage);
    }

    isPosting(): boolean {
      return this.isPostingFlag;
    }

    ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

       ngOnInit() {
        this.createForm();
        this.route.params.subscribe((params: {id: number}) => {
          this.groupId =  params.id;
          this.posts = this.messageService.loadRecentPosts(this.groupId, 50);
          // this.posts.on('child_added', function(data) {
          //   addCommentElement(postElement, data.key, data.val().text, data.val().author);
          // });
          this.groupService.getGroupDetail(this.groupId).subscribe((group) => {
            this.groupDetail = group;
            console.log('got group byId', group);
          },
          ()=> {},
          () => {});
        });

        // Event      	  Typical usage
        // child_added	  Retrieve lists of items or listen for additions to a list of items. This event is triggered once for each existing child and then again every time a new child is added to the specified path. The listener is passed a snapshot containing the new child's data.
        // child_changed	Listen for changes to the items in a list. This event is triggered any time a child node is modified. This includes any modifications to descendants of the child node. The snapshot passed to the event listener contains the updated data for the child.
        // child_removed	Listen for items being removed from a list. This event is triggered when an immediate child is removed.The snapshot passed to the callback block contains the data for the removed child.
        // child_moved	  Listen for changes to the order of items in an ordered list. child_moved events always follow the child_changed event that caused the item's order to change (based on your current order-by method).

        // var commentsRef = firebase.database().ref('post-comments/' + postId);
        // commentsRef.on('child_added', function(data) {
        //   addCommentElement(postElement, data.key, data.val().text, data.val().author);
        // });
        
        // commentsRef.on('child_changed', function(data) {
        //   setCommentValues(postElement, data.key, data.val().text, data.val().author);
        // });
        
        // commentsRef.on('child_removed', function(data) {
        //   deleteComment(postElement, data.key);
        // });
        

      //    //important: create form should be in ngOnInit(), and not in the constructer
      //    this.createForm();
           
      //     this.groupForm.get('userNameField').valueChanges
      //        .startWith(null)
      //        .forEach(term => {
      //            if(!this.utils.isEmptyString(term)) {
      //               this.search(term);
      //            }
      //       });

      //       this.filteredUsers = this.searchTerms
      //       .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      //       .distinctUntilChanged()   // ignore if next search term is same as previous
      //       .switchMap(term => term   // switch to new observable each time the term changes
      //         // return the http search observable
      //         ? this.userService.searchUser(term)
      //         // or the observable of empty heroes if there was no search term
      //         : Observable.of<any[]>([]))
      //       .catch(error => {
      //         // TODO: add real error handling
      //         console.log(error);
      //         return Observable.of<any[]>([]);
      //       });
      //  }

      // addUser(user: any): void {
      //   this.groupForm.get('userNameField').setValue('', {onlySelf: true});
      //   if(this.selectedUsers.filter((selectedUser) => {
      //     return selectedUser.userId === user.userId;
      //    }).length > 0) {
      //     return;
      //    }
      //   this.selectedUsers.push(user);
      //  }

      // removeUser(user): void {
      //    this.selectedUsers = this.selectedUsers.filter((selectedUser) => {
      //     return selectedUser.userId !== user.userId;
      //    });
      //  }

      //  //TODO: redirect to groupDetail page wiht the created groupData
      //  createGroup(): void {
      //    if(!this.groupForm.valid) {
      //     //  PopUps.Error('Please fix errors in form');
      //     return;
      //    }
      //    if(this.selectedUsers.length <= 0) {
      //     //  PopUps.Error('No of members of group should be greater than one.');
      //     return;
      //    }
      //    let createGroupDto = this.groupForm.value;
      //    createGroupDto.userIds = this.selectedUsers.map((selectedUser => {return selectedUser.userId;}));
      //    console.log('CreateGroupDto: ', createGroupDto);
      //    this.groupService.createGroup(createGroupDto).subscribe(
      //      (next) => {console.log('Next: ', next);},
      //      (error) => {console.log('Error: ', error);},
      //      () => {console.log('Completed GroupCreation');});
         }

      goToUserDetails(userId: String): void {
        this.router.navigate(['user', userId]);
      }
}
