import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';

//User
import { UserComponent }   from './user/user.component';
import { UserListComponent }   from './userList/user.list.component';
import { UserResolver }   from './user/userResolver';
import { UserListResolver }   from './userList/user.list.resolver';

//SignUp
import { SignUpComponent }   from './signUp/signUp.component';

import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';

//Group
import { GroupListComponent }   from './group-list/group-list.component';
import { GroupDetailResolver }   from './groupDetail/group.detail.resolver';
import { GroupListResolver }    from './group-list/group.list.resolver';
import { LoginActivate } from './config/LoginActivate';
import { AddGroupComponent } from './groupAdd/add.group.component';
import { GroupDetailComponent } from './groupDetail/group.detail.component';
// import { CoolLocalStorage } from "angular2-cool-storage";

export const AppRoutes: Routes = [
    {
        path: '', 
        //TODO localStorage: does this need to change?? 
        // redirectTo: 'user/' + localStorage.getItem('loggedInUserId'),
        component: UserComponent,
        resolve: {
            loggedInUser: UserResolver
         },
        canActivate:[LoginActivate],
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: SignUpComponent
        // canActivate:[LoginActivate]
    },
    {
        path: 'dashboard',
        component: DashboardComponent
        // canActivate:[LoginActivate]
    },
    {
        path: 'user/:id',
        component: UserComponent,
        resolve: {
            loggedInUser: UserResolver
         }
    },
    {
        path: 'users',
        component: UserListComponent,
        resolve: {
            usersList: UserListResolver
        }
    },
    {
        path: 'groups',
        component: GroupListComponent,
        resolve: {
            groupList: GroupListResolver
        },
         canActivate:[LoginActivate]
    },
    //TODO: try nested components here
    {
        path: 'group/:id',
        component: GroupDetailComponent,
        // resolve: {
        //     groupDetail: GroupDetailResolver
        // },
        canActivate:[LoginActivate]
    },
    {
        path: 'addGroup',
        component: AddGroupComponent,
        canActivate:[LoginActivate]
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    },
    {
        path: 'signUp',
        component: SignUpComponent
    }
]
