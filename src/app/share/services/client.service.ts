import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InsertUpdateClientModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiBaseUrl: string;
  controllerName: string = 'Client/';

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  Get() {
    return this.http.get<InsertUpdateClientModel[]>(`${this.apiBaseUrl}${this.controllerName}`);
  }

  GetByID(id: number) {
    return this.http.get<InsertUpdateClientModel[]>(`${this.apiBaseUrl}${this.controllerName}${id}`);
  }

  Post(body: any) {
    return this.http.post<InsertUpdateClientModel[]>(`${this.apiBaseUrl}${this.controllerName}`, body);
  }

  Put(body: any) {
    return this.http.put<InsertUpdateClientModel[]>(`${this.apiBaseUrl}${this.controllerName}`, body);
  }
}
