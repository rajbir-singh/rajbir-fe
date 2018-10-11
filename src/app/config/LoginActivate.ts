import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { ConfigService } from '../services/ConfigService';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private configService: ConfigService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean>|Promise<boolean>|boolean {
    this.router.navigate(['users']);
    return true;
  }
  
}