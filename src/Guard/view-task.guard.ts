import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

export const viewTaskGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const router = inject(Router);
  const alertservice = inject(MessageService);

  if (role == 'user') {
    return true;
  } else {
    router.navigate(['/login'])
    alertservice.add({
      key: 'tc',
      severity: 'error',
      summary: 'Please Login to View',
    });
    return false;
  }
};
