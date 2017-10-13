import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { ConfigService } from '../services/ConfigService';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {

    //used put/post requests
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private configService: ConfigService, private router: Router) {}

    getGroupDetail(groupId: any): Observable<any> {
        var url = this.configService.beUrl + '/api/v1/group/' + groupId;
        return this.http.get(url, {headers: this.headers})
        // .toPromise().then((group) => {
        //     console.log(group);
        // });
        .map(group => {
            return group.json().data});
    }

    getGroups(pageNumber, pageSize): any {
        pageNumber = pageNumber || 0;
        pageSize = pageSize || 100;
        var usersListUrl = this.configService.beUrl + '/api/v1/group/list?page=' + pageNumber + '&size=' + pageSize;
        return this.http.get(usersListUrl, {headers: this.headers}).toPromise()
        .then(usersList => {
            return usersList.json().data
        }).catch(error => {
            console.log('Some error occurred while getting groups list');
        });
    }

    createGroup(groupDto: any): Observable<any> {
        var url = this.configService.beUrl + '/api/v1/group/create';
        return this.http.put(url, JSON.stringify(groupDto), {headers: this.headers}).map(group => {
            return group.json().data});
            }

    postMessage(message): void {
        console.log(message);
    }
}