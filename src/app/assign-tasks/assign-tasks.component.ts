import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/Services/registration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration, User_Task } from 'src/Model/registration';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css'],
})
export class AssignTasksComponent implements OnInit {
  constructor(
    private register: RegistrationService,
    private http: HttpClient
  ) {}

  user_data: Registration[] = [];
  myForm1!: FormGroup;
  task!: FormControl;
  duedate!: FormControl;
  assignedUser: Registration = {
    id: 0,
    firstname: '',
    email: '',
    password: '',
    confirm_paswword: '',
    isActive: false,
    assigned_tasks: [],
    role: '',
  };
  viewtasks = '';
  username = '';
  previousTask = '';
  taskList: any = [];
  modifiedTask: User_Task | any = [];

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
      // console.log(task.task)
      // this.taskList.replaceall(task.task,'suma')
      //  const c= task.task.toString()
      //   console.log(typeof(c))
      // const b = c.replaceAll(task.task,)
      // console.log(b)
      // task.task=b
      // console.log(task.task)
    }
  }

  assign_Tasks(form: any) {
    form.value.date = new Date().toLocaleDateString();
    form.value.status = 'Assigned';
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

  update_task(task: User_Task) {
    console.log(task);
    this.modifiedTask = task;
  }

  modified_task() {
    console.log(this.assignedUser);
    this.assignedUser.assigned_tasks = Array.from(
      this.assignedUser.assigned_tasks
    );
    // this.assignedUser.assigned_tasks.push(this.modifiedTask);
    console.log(this.assignedUser);
    const url =
      'http://localhost:3000/registeration' + '/' + this.assignedUser.id;
    return this.http.put(url, this.assignedUser).subscribe((res) => {
      console.log(res);
    });
  }
}
