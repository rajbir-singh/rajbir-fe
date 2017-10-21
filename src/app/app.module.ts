import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
//Mine
import { SignUpComponent }   from './signUp/signUp.component';
import { ConfigService } from './services/ConfigService';
import { MessageService } from './services/message.service';
import { Utils } from './services/Utils';
import { LoginActivate } from './config/LoginActivate';
import { HttpModule }    from '@angular/http';
import { FieldComponent }    from './field/field.component';
import { SignUpService } from './services/SignUpService';
import { UserComponent }   from './user/user.component';
import { UserListComponent }   from './userList/user.list.component';

// Import the AngularFireModule and the AngularFireDatabaseModule
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import {
  MaterialModule,
  // MdAutocompleteModule,
//   MdButtonModule,
//   MdButtonToggleModule,
//   MdCardModule,
//   MdCheckboxModule,
//   MdChipsModule,
//   MdCoreModule,
//   MdDatepickerModule,
//   MdDialogModule,
//   MdExpansionModule,
//   MdGridListModule,
//   MdIconModule,
//   MdInputModule,
//   MdListModule,
//   MdMenuModule,
//   MdNativeDateModule,
//   MdPaginatorModule,
//   MdProgressBarModule,
//   MdProgressSpinnerModule,
//   MdRadioModule,
//   MdRippleModule,
//   MdSelectModule,
//   MdSidenavModule,
//   MdSliderModule,
//   MdSlideToggleModule,
//   MdSnackBarModule,
//   MdSortModule,
//   MdTableModule,
//   MdTabsModule,
//   MdToolbarModule,
//   MdTooltipModule,
} from '@angular/material';

// Define the firebase database configuration keys, get it from your Firebase application console
//TODO: manage rules on firebase console so that only authentic users can read/write data
export const firebaseConfig = {
  apiKey: "AIzaSyBFodVZ6du4OR89bu3MzcHi8KjnN1mFwzk",
  authDomain: "my-chat-app-2becc.firebaseapp.com",
  databaseURL: "https://my-chat-app-2becc.firebaseio.com",
  projectId: "my-chat-app-2becc",
  storageBucket: "",
  messagingSenderId: "300228273168"
};

import { CoolStorageModule } from "angular2-cool-storage";

import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { UserResolver }   from './user/userResolver';
import { UserService }   from './services/user.service';
import { GroupService }   from './services/GroupService';
import { GroupListResolver }   from './group-list/group.list.resolver';
import { UserListResolver }   from './userList/user.list.resolver';
import { AddGroupComponent }   from './groupAdd/add.group.component';
import { GroupDetailComponent }   from './groupDetail/group.detail.component';
import { TestCompComponent } from './test-comp/test-comp.component';
import { GroupListComponent } from './group-list/group-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    UserListComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    SignUpComponent,
    FieldComponent,
    AddGroupComponent,
    GroupDetailComponent,
    TestCompComponent,
    GroupListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'}),
    HttpModule,
    MaterialModule,
    // MdAutocompleteModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    CoolStorageModule
  ],

  // We recommend registering app-wide services in the root AppModule providers.
  //all those types whose singleton instances are required when injected via constructor must be liste in providers
  //so that angular can make them injectable
  //add providers to app component and its child components
  //Lets say we have NameService as application wide injectable for the type NameService, but one particular component should get a different one? This is where the @Component decorators’ providers property comes in. It allows us to add providers to a specific component (and its child components)
  providers: [
    MessageService,
    AngularFireModule,
    AngularFireDatabaseModule,
    ConfigService,
    UserResolver,
    UserListResolver,
    GroupListResolver,
    UserListComponent,
    GroupService,
    UserService,
    Utils,
    LoginActivate,
    SignUpService],
    
  bootstrap: [AppComponent]
})
export class AppModule { }