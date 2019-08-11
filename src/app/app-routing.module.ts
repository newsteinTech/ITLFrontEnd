import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';
import { NewIncidentComponent } from './components/new-incident/new-incident.component';
import { ReactiveFormValidationComponent } from './components/reactive-form-validation/reactive-form-validation.component';
import { TemplateDrivenFormValidationComponent } from './components/template-deriven-form-validation/template-deriven-form-validation.component';
import { EditIncidentComponent } from './components/edit-incident/edit-incident.component';
import { UserListPopupComponent } from './components/user-list-popup/user-list-popup.component';
import { IncidentByAssignedToComponent } from './components/incident-by-assigned-to/incident-by-assigned-to.component';
import { IncidentByGroupComponent } from './components/incident-by-group/incident-by-group.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'profile', component: ProfileComponent},
  {path:'userList', component: UserComponent},
  {path:'addUser', component: AddUserComponent},
  {path:'editUser', component: EditUserComponent},
  {path:'login', component: LoginComponent},
  {path:'incidentList', component: IncidentListComponent},
  {path:'incidentByGroup', component: IncidentByGroupComponent},
  {path:'incidentByAssignedTo', component: IncidentByAssignedToComponent},
  {path:'openIncident', component: NewIncidentComponent},
  {path:'userListPopup', component: UserListPopupComponent},
  {path:'editIncident', component: EditIncidentComponent},
  {path:'form1', component: ReactiveFormValidationComponent},
  {path:'form2', component: TemplateDrivenFormValidationComponent},
  {path:'WelcomePage', component: WelcomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
