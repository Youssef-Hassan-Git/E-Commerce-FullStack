import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private ALL_USERS_URL = "http://localhost:3000/user/getusers"
  private USER_UPDATE_PROFILE_URL = "http://localhost:3000/user/updateprofile"
  private USER_GET_PROFILE_URL = "http://localhost:3000/user/getprofile"
  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<any>(this.ALL_USERS_URL)
  }

  getUserProfile(){
    return this.http.get<any>(`${this.USER_GET_PROFILE_URL}`)
  }

  updateUserProfile( data: any){
    return this.http.put<any>(`${this.USER_UPDATE_PROFILE_URL}`, data)
  }



}
