import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';

const routes: Routes = [
  {path:"users",component:UsersComponent},
  {path:"editUser",component:EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
