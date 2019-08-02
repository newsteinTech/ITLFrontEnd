import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UsersComponent } from '../users/users.component';
import { TrialComponent } from '../trial/trial.component';


@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  userId;
  constructor( private dialog:MatDialog ) {

    this.userId = "";

  }

  ngOnInit() {
  }

  getUsers(){

    console.log("Users");
    let configDialog = new MatDialogConfig();
    configDialog = new MatDialogConfig();
    // configDialog.disableClose = true;
    configDialog.autoFocus = true;
    configDialog.width = "65%";
    let diolagRef = this.dialog.open(TrialComponent,configDialog);
    const sub = diolagRef.componentInstance.userI.subscribe((data)=>{
      console.log(data);
      this.userId = data;
      this.dialog.closeAll();
    })

  }

}
