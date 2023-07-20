import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')
    const router = inject(Router)
    const alertservice = inject(MessageService)
 
   if(role =='admin'){
    router.navigate(['/task'])
    return true
   }
  else if(role=='user'){
    router.navigate(['/viewtask'])
    // alertservice.add({
    //   key:"tc",
    //   severity:"error",
    //   summary:"Only Authorized Users"
    //     })
    return false

   }
  else
     {
      alertservice.add({
    key:"tc",
    severity:"error",
    summary:"Only Authorized Users"
      })
      return false
     }
    
};
