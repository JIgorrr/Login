import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../../interfaces/plans';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private baseUrl = 'http://localhost:5025/api/v1/role'

  constructor(private http: HttpClient) { }

  getRoles() : Observable<Plan[]>{
    return this.http.get<Plan[]>(`${this.baseUrl}/get-roles`);
  }
}
