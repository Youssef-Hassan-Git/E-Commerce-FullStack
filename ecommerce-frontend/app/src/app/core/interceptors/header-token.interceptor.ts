import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const headerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _authS = inject(AuthService)
  const token = _authS.getToken()
  if(token){
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next(cloned);
  }

  return next(req);


};
