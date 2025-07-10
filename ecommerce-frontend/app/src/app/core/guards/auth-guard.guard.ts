import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();
  const userRole = authService.getRole();
  
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  
  if (userRole !== 'admin') {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
