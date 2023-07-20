import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/Services/registration.service';
import { Registration,User_Task } from 'src/Model/registration';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  constructor(private register:RegistrationService,){}
  user:Registration[]=[]
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
  user_task:any[]=[]
  modifiedStatus: User_Task | any = [];
  ngOnInit(): void {
    this.register.getCredentials().subscribe((res)=>{this.user=res
    for (const task of this.user) {
      if(task.isActive){
        for (let x of task.assigned_tasks) {
          this.user_task.push(x)
          console.log(x.status)
        }
      }
      
    }
    })

    
  }
  
  update_Status(status:User_Task){
    this.modifiedStatus=status;
    
  }

  update_Modified_Status(user:Registration){
    this.assignedUser=user
    this.assignedUser.assigned_tasks = Array.from(this.assignedUser.assigned_tasks);
    this.register.edit_task(this.assignedUser,this.assignedUser.id)
  }

}
