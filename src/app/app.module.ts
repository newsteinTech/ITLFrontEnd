import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';
import { NewIncidentComponent } from './components/new-incident/new-incident.component';
import { ReactiveFormValidationComponent } from './components/reactive-form-validation/reactive-form-validation.component';
import { TemplateDrivenFormValidationComponent } from './components/template-deriven-form-validation/template-deriven-form-validation.component';
import { EditIncidentComponent } from './components/edit-incident/edit-incident.component';
import { UserListPopupComponent } from './components/user-list-popup/user-list-popup.component';
import { IncidentByAssignedToComponent } from './components/incident-by-assigned-to/incident-by-assigned-to.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChartsModule } from "ng2-charts";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    IncidentListComponent,
    NewIncidentComponent,
    ReactiveFormValidationComponent,
    TemplateDrivenFormValidationComponent,
    EditIncidentComponent,
    UserListPopupComponent,
    IncidentByAssignedToComponent,
    ProfileComponent,
    DashboardComponent,
    LogoutComponent,
    BubbleChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,// for displaying arrow animation in table header
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
