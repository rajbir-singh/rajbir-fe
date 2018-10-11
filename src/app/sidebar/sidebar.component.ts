import { Component, OnInit } from '@angular/core';
// import { CoolLocalStorage } from "angular2-cool-storage";

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // { path: 'signUp', title: 'SignUp',  icon:'ti-export', class: ''},
    // { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    //TODO localStorage: does this need to change??
    { path: 'user/' + localStorage.getItem('loggedInUserId'), title: 'User Profile',  icon:'ti-user', class: '' },
    { path: 'users', title: 'Users List',  icon:'ti-view-list-alt', class: '' },
    { path: 'addGroup', title: 'Add Group',  icon:'ti-google', class: '' },
    { path: 'groups', title: 'All Groups',  icon:'ti-view-list-alt', class: '' },
    // { path: 'typography', title: 'Typography',  icon:'ti-text', class: '' },
    // { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
    // { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
