import { Component, OnInit } from '@angular/core';
import { FormsService } from '../Services/forms.service';


@Component({
  selector: 'app-form-trial',
  templateUrl: './form-trial.component.html',
  styleUrls: ['./form-trial.component.css']
})
export class FormTrialComponent implements OnInit {

  constructor( private service: FormsService) { 



  }

  ngOnInit() {
  }

}
