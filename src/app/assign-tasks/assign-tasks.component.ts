import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/Services/registration.service';
import { FormControl,FormGroup } from '@angular/forms';
import { Registration,User_Task } from 'src/Model/registration';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css']
})
export class AssignTasksComponent implements OnInit  {
 
 constructor(private register: RegistrationService){}
 
 user_data: any[] = [];
 myForm1!: FormGroup;
 task!: FormControl;
 assignedUser!:Registration;
username='';
previousTask=''



 ngOnInit(): void {
  this.register.getCredentials().subscribe((res) => (this.user_data = res));
  this.task = new FormControl('',[]);


  this.myForm1 = new FormGroup({
    task: this.task,
    
  });
 }
 showUser(user:Registration){
  console.log(user)
  this.username=user.firstname
  this.assignedUser=user;
 }

 assign_Tasks(form:any){
  if(this.assignedUser.assigned_tasks[this.assignedUser.assigned_tasks.length-1]==undefined)
  {
    form.value.id=1
  }
  else{
    this.previousTask=JSON.stringify(this.assignedUser.assigned_tasks[this.assignedUser.assigned_tasks.length-1])
    form.value.id=parseInt(this.previousTask[this.previousTask.length-2])+1
  }

  this.register.assign_task(this.assignedUser,this.assignedUser.id,form.value);
}
}
