import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5034/api';

  createUser(user: any){
    return this.http.post(this.baseUrl + '/signup', user);
  }

  loginUser(user: any){
    return this.http.post(this.baseUrl + '/signin', user)
  }
}
