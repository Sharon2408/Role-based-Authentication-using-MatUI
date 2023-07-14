import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/Services/registration.service';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css']
})
export class AssignTasksComponent implements OnInit  {
 constructor(private register: RegistrationService){}
 
 user_data: any[] = [];

 ngOnInit(): void {
  this.register.getCredentials().subscribe((res) => (this.user_data = res));
 }
}
