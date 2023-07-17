import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from 'src/Model/registration';
import { environment } from 'src/Environment/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient,private router:Router) {}

  registerUrl = environment.registerUrl;

  get_User_Details(form:Registration) {
    return this.http.post<Registration[]>(this.registerUrl, form).subscribe((res)=>{
      this.router.navigate(['/login'])
    });
  }

  getCredentials(){
    return this.http.get<Registration[]>(this.registerUrl)
  }

  isActive(item:Registration,id:number){
    let reg = this.registerUrl +'/'+ id
    item.isActive=true;
    return this.http.put(reg,item).subscribe(()=>{})
  }

  assign_task(item:Registration,id:number,form_value:any){
    let reg = this.registerUrl +'/'+ id
    item.assigned_tasks.push(form_value)
    return this.http.put<Registration>(reg,item).subscribe();
  }


}
