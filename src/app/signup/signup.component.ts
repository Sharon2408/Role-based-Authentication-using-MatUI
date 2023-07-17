import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RegistrationService } from 'src/Services/registration.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private register: RegistrationService,
    private route: Router,
    private alert: MessageService
  ) {}

  // Form
  myForm1!: FormGroup;
  name!: FormControl;
  email!: FormControl;
  password!: FormControl | any;
  confirm_password!: FormControl | any;


  // Submit
  onSubmit() {
    this.register.get_User_Details(this.myForm1.value);
    this.alert.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success',
      detail: 'Registration Successful',
    });
    setTimeout(() => {
      this.route.navigate(['/login']);
    }, 2000);
  }

  ngOnInit(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]);

    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
      ),
    ]);

    this.confirm_password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
      ),
    ]);

    this.myForm1 = new FormGroup({
      firstname: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      isActive: this.builder.control(false),
      assigned_tasks:this.builder.control([])
    });
  }
}
