import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UsersComponent } from './Components/users/users.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { CreateGroupsComponent } from './Components/create-groups/create-groups.component';
import { IncidentComponent } from './Components/incident/incident.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    SideBarComponent,
    EditUserComponent,
    CreateUserComponent,
    CreateGroupsComponent,
    IncidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
