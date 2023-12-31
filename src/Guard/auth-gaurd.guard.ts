import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role')
  const router = inject(Router)
  const alertservice = inject(MessageService)

  if (role == 'admin') {
    
    return true
  }
  else if (role == 'user') {
    router.navigate(['/viewtask'])
    console.log('error')
    return false

  }
  alertservice.add({
    key: "tc",
    severity: "error",
    summary: "Only Authorized Users"
  })

  return false
};
