import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/Services/registration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration, User_Task } from 'src/Model/registration';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css'],
})
export class AssignTasksComponent implements OnInit {
  constructor(private register: RegistrationService) {}

  user_data: Registration[] = [];
  myForm1!: FormGroup;
  task!: FormControl;
  duedate!: FormControl;
  assignedUser: any;
  viewtasks = '';
  username = '';
  previousTask = '';
  taskList: any = [];

  ngOnInit(): void {
    this.register.getCredentials().subscribe((res) => (this.user_data = res));
    this.task = new FormControl('', [Validators.required]);
    this.duedate = new FormControl('', [Validators.required]);
    this.myForm1 = new FormGroup({
      duedate: this.duedate,
      task: this.task,
      
    });
  }
  showUser(user: Registration) {
    this.taskList.length = 0;
    this.username = user.firstname;
    this.assignedUser = user;
    for (const task of this.assignedUser.assigned_tasks) {
      this.taskList.push(task);
      console.log(task.task)
      // this.taskList.replaceall(task.task,'suma')
     const c= task.task.toString()
      console.log(typeof(c))
    const b = c.replaceAll(task.task,'hello')
    console.log(b)
    task.task=b
    console.log(task.task)
    }
  }

  assign_Tasks(form: any) {
    form.value.date = new Date().toLocaleDateString();
    form.value.status = 'Assigned'
    if (
      this.assignedUser.assigned_tasks[
        this.assignedUser.assigned_tasks.length - 1
      ] == undefined
    ) {
      form.value.id = 1;
    } else {
      this.previousTask = JSON.stringify(
        this.assignedUser.assigned_tasks[
          this.assignedUser.assigned_tasks.length - 1
        ]
      );
      form.value.id =
        parseInt(this.previousTask[this.previousTask.length - 2]) + 1;
    }
   
    this.register.assign_task(
      this.assignedUser,
      this.assignedUser.id,
      form.value
    );
    this.myForm1.reset();
  }
}
