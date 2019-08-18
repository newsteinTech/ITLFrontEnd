import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
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
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TrialComponent } from './Components/trial/trial.component';
import { MaterialModule } from './material/material.module';
import { FormTrialComponent } from './form-trial/form-trial.component';
import { MatRadioButton } from '@angular/material';
import { IncidentListComponent } from './Components/incident-list/incident-list.component';
import { EditIncidentComponent } from './Components/edit-incident/edit-incident.component';
import { LoginComponent } from './Components/login/login.component';

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
    IncidentComponent,
    TrialComponent,
    FormTrialComponent,
    IncidentListComponent,
    EditIncidentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    // MatRadioButton
  ],
  providers: 
  [
    {provide: APP_BASE_HREF, useValue : '/' },
    // { 
    //   provide: NG_VALUE_ACCESSOR,
    //   multi: true,
    //   useExisting: forwardRef(()=>IncidentComponent),
    // }
  ],
  bootstrap: [AppComponent],
  entryComponents: [TrialComponent]
})
export class AppModule { }
