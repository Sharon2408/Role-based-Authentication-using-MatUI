import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/Services/registration.service';
import { Registration } from 'src/Model/registration';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  constructor(private register:RegistrationService,){}
  user:Registration[]=[]
  user_task:any[]=[]
  ngOnInit(): void {
    this.register.getCredentials().subscribe((res)=>{this.user=res
    console.log(this.user)
    for (const task of this.user) {
      if(task.isActive){
        for (let x of task.assigned_tasks) {
          this.user_task.push(x)
          
        }
      }
      
    }
    })


  }
}
