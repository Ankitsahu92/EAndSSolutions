import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InsertUpdateEmployeeModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiBaseUrl: string;
  controllerName: string = 'Employee/';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  Get() {
    return this.http.get<InsertUpdateEmployeeModel[]>(`${this.apiBaseUrl}${this.controllerName}`);
  }

  GetByID(id: number) {
    return this.http.get<InsertUpdateEmployeeModel[]>(`${this.apiBaseUrl}${this.controllerName}${id}`);
  }

  Post(body: any) {
    return this.http.post<InsertUpdateEmployeeModel[]>(`${this.apiBaseUrl}${this.controllerName}`, body);
  }

  Put(body: any) {
    return this.http.put<InsertUpdateEmployeeModel[]>(`${this.apiBaseUrl}${this.controllerName}`, body);
  }
}
