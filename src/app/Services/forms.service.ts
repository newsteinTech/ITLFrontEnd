import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  form: FormGroup = new FormGroup({

    $key: new FormControl(null),
    Name: new FormControl(''),
    Email: new FormControl(''),
    PhoneNo: new FormControl(''),
    UserId: new FormControl(''),
    Password: new FormControl(''),
    Role: new FormControl('1'),
    Group: new FormControl(0),
    HireDate: new FormControl('')

  });
  constructor() {



  }
}
