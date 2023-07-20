import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RegistrationService } from 'src/Services/registration.service';
import { Registration } from 'src/Model/registration';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private register: RegistrationService,
    private router: Router,
    private alert: MessageService
  ) {}
  Login_Form!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  Radiobutton!: FormControl;
  formdata: Registration[] = [];

  onSubmit() {
    this.register.getCredentials().subscribe((res) => {
      this.formdata = res;
      const user = this.formdata.find((a: any) => {
        if (
          a.email === this.Login_Form.value.email &&
          a.password === this.Login_Form.value.password &&
          a.role == 'user'
        ) {
          this.register.isActive(a, a.id);
          localStorage.setItem('role', 'user');
          return true;
        } else if (
          a.email === this.Login_Form.value.email &&
          a.password === this.Login_Form.value.password &&
          a.role == 'admin'
        ) {
          this.register.isActive(a, a.id);
          localStorage.setItem('role', 'admin');
          return true;
        }
        return false;
      });
      // To Genrate token if user is found
      if (user) {
        this.Login_Form.reset();
          localStorage.setItem('token', Math.random().toString());
        this.router.navigate(['/task']);
        this.alert.add({
          key: 'tc',
          severity: 'success',
          summary: 'success',
          detail: 'Login Successful',
        });
      } else {
        this.alert.add({
          key: 'tc',
          severity: 'error',
          summary: 'User Not Found',
          detail: 'Invalid Credentials',
        });
        this.Login_Form.reset();
      }
    });
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
      ),
    ]);

    this.Radiobutton = new FormControl('', [Validators.required]);
    this.Login_Form = new FormGroup({
      email: this.email,
      password: this.password,
      Radiobutton: this.Radiobutton,
    });
  }
}
