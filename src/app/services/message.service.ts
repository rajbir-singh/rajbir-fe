
import 'rxjs/add/operator/map';
// Import the required packages to the service
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
// import "rxjs/add/operator/map";

@Injectable()
export class MessageService {

  // Flag to see if status update is in progress
  private inProgress: boolean = false

  // Possible available reactions
  private reactions: string[] = ['like', 'love', 'dislike']

  // The maimum length and minimum length of a status
  public maxLength:number = 500
  public minLength:number = 0

  // Flag that determines if the status text is valid or nah
  public statusTextValid: boolean = false

  // Class constructor, injects the angular fire database as this.af
  constructor(private af: AngularFireDatabase) { }

  // ----------------------------------------------------------------------
  // Method to post the status to Firebase
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------
  // Method to send a reaction to a status to Firebase
  // ----------------------------------------------------------------------

  // react(reaction: string, status) {
  //   if (~this.reactions.indexOf(reaction)) {
  //     let reactions: any = {}
  //     let count: number = isNaN(parseInt(status[reaction])) ? 0 : parseInt(status[reaction])
  //     reactions[reaction] = count+1
  //     this.statuses.update(status.$key, reactions)
  //   }
  // }

  // ----------------------------------------------------------------------
  // Method to get the recent statuses from Firebase
  // ----------------------------------------------------------------------

  loadRecentPosts(groupId: number): Observable<any[]> {
    return this.af.list('/posts/' + groupId).valueChanges();
  }

  addPost(post: any): any {
    let groupId = post.groupId;
    const postsRef = this.af.list('/posts/' + groupId);
    return postsRef.push(post);
  }

  // ----------------------------------------------------------------------
  // Method to check the validity of a status update
  // ----------------------------------------------------------------------

  valid(status: string) : boolean {
    return status.length >= this.minLength && status.length <= this.maxLength
  }

  // ----------------------------------------------------------------------
  // Method to check the in progress flag
  // ----------------------------------------------------------------------

  updating() : boolean {
    return this.inProgress
  }
}
