import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-deriven-form-validation',
  templateUrl: './template-deriven-form-validation.component.html',
  styleUrls: ['./template-deriven-form-validation.component.css']
})
export class TemplateDrivenFormValidationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  model: any = {};

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }

}
