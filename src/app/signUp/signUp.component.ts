import { Component, OnChanges, OnInit, Input, EventEmitter } from '@angular/core';
import * as Chartist from 'chartist';
import { SignUpService } from '../services/SignUpService';
import { ConfigService } from '../services/ConfigService';
import { Utils } from '../services/Utils';
import { Router }  from '@angular/router';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

declare var $:any;
declare const gapi: any;

//The @Component decorator provides the Angular metadata for the component.
//The CSS selector name, signUp-cmp, will match the element tag that identifies this component within a parent.
//component's template.you can add a <signUp-cmp> element to the AppComponent template.
@Component({
    selector: 'sign-up',
    moduleId: module.id,
    templateUrl: 'signUp.component.html'
})

export class SignUpComponent {
}
