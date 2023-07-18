import {  Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/Services/registration.service';
import { Registration } from 'src/Model/registration';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private register: RegistrationService,
    private alert: MessageService,
    private router: Router
  ) {}

  formdata: Registration[] = [];
  hide: boolean = false;

  ngOnInit(): void {
    this.register.getCredentials().subscribe((res) => {
      this.formdata = res;
      for (const x of this.formdata) {
        if (x.isActive == true) {
          this.hide = true;
        }
      }
    });
  }

  logout() {
    this.register.getCredentials().subscribe((res) => {
      this.formdata = res;
      const confirmation = confirm('You will be Logged out!!');
      this.formdata.find((a: any) => {
        if (confirmation && a.isActive == true) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          this.hide = false;
          this.register.isDeactive(a, a.id);
          this.alert.add({
            key: 'tc',
            severity: 'error',
            summary: 'Logged Out',
          });
          this.router.navigate(['/login']);
          return true;
        }
        return false;
      });
    });
  }
}
