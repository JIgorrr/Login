import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from '../../interfaces/register-user';
import { LoginUser } from '../../interfaces/login-user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = "http://localhost:5025/api/v1/user";

  constructor(private http: HttpClient) { }

  createUser(registerUser: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(`${this.baseUrl}/create-user`, registerUser);
  }

  verifyUser(loginUser: LoginUser): Observable<LoginUser> {
    return this.http.post<LoginUser>(`${this.baseUrl}/user-verify`, loginUser);
  }
}
