import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { IncidentComponent } from './Components/incident/incident.component';
import { FormTrialComponent } from './form-trial/form-trial.component';
import { IncidentListComponent } from './Components/incident-list/incident-list.component';

const routes: Routes = [
  {path:"users",component:UsersComponent},
  {path:"editUser",component:EditUserComponent},
  {path:"createUser",component:CreateUserComponent},
  {path:"incident",component:IncidentComponent},
  {path:"trialForm",component:FormTrialComponent},
  {path:"incidentList",component:IncidentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
