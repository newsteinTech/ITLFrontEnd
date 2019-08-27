import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  private grpNum:number;
  private userNum:number;
  private chartData = [
    {
      label: 'Users',
      data: []  
    }
  ];
  private incData;
  private labels;
  colors = [
    { 
      backgroundColor: 'rgb(255, 108, 2,0.8)'
    }
  ]
  chartOptions = {
    responsive: true,
    scales : {
      xAxes: [{
         ticks: {
            steps : 5,
            stepValue : 1,
            max : 5,
            min : 0
          }
      }] 
    }
  }

  constructor( private service:DashboardService, private routes:Router ) { }

  ngOnInit() {

    this.service.userData().subscribe((data:any)=>{

      console.log(data);
      this.labels = data.data.gr;
      let users = data.data.user;
      this.chartData = [{
        label: 'Users',
        data: users
      }]
      // console.log(this.chartData);
      this.grpNum = this.labels.length;
      this.userNum = data.data.totalUsers
      console.log(this.grpNum);
      console.log(this.userNum);

    },(err:any)=>{

      console.log(err);

    })

  }

  user(per){

    if( per == 0 ){
      this.routes.navigate(["users"]);
    }else if( per == 1 ){
      this.routes.navigate(["createUser"])
    }
    

  }

}
