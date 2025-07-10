import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLoginRequest, IUserResponse, RegisterRequest, RegisterResponse } from '../models/models';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }

  private REGISTER_URL = "http://localhost:3000/user/createuser"
  private ADMIN_REGISTER_URL = "http://localhost:3000/user/createadmin"
  private LOGIN_URL = "http://localhost:3000/auth/login";
  private TOKEN_KEY='token'



  register(data: RegisterRequest){
    return this.http.post<RegisterResponse>(`${this.REGISTER_URL}`, data)
  }

  adminRegister(data: RegisterRequest){
    return this.http.post<RegisterResponse>(`${this.ADMIN_REGISTER_URL}`, data)
  }

  login(credentials: IUserLoginRequest ): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(this.LOGIN_URL, credentials).pipe(
      tap((res) => {
        this.setToken(res.accessToken);     
 })
    );
  }
  

    decodeToken(token: string){
      return jwtDecode<any>(token);
    }

    setToken(token:string){
      localStorage.setItem(this.TOKEN_KEY,token);
    }

    getToken(): string | null {
      return localStorage.getItem(this.TOKEN_KEY)
    }



    getRole(): string | null{
      const getToken = this.getToken()
      if(getToken){
        return this.decodeToken(getToken).role;
      }
      return null;
    }

    getUsername(): string | null{
      const getToken = this.getToken()
      if(getToken){
        return this.decodeToken(getToken).name;
      }
      return null;      
    }


    adminLogOut(){
      localStorage.removeItem(this.TOKEN_KEY)
      this._router.navigate(['/login'])
    }

    userLogOut(){
      localStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem('userRole')
      this._router.navigate(['/products'])
    }






}

