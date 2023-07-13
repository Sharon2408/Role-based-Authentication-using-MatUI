import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  // Form
  myForm1!: FormGroup;
  name!: FormControl;
  email!: FormControl;

  // Submit
  onSubmit(form: any) {
    console.log(form.value);
  }

  ngOnInit(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    
    this.myForm1 = new FormGroup({
      firstname: this.name,
      email: this.email,
      // password: this.password,
      // confirm_password: this.confirm_password,
      //
      // Radiobtn: this.Radiobtn,
      // Dealership: this.Dealership,
      // DealershipNum: this.DealershipNum,
      // City: this.City,
      // State: this.State,
      // GSTNum: this.GSTNum,
      // isActive: this.builder.control(false),
    });
  }
}
