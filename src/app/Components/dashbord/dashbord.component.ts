import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

 

  constructor( private service:DashboardService ) { }

  ngOnInit() {

    

  }


 
}
