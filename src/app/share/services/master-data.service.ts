import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MasterData } from '../models/MasterDataModel';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  apiBaseUrl: string;

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  GetNurseList() {
    return this.http.get<MasterData[]>(`${this.apiBaseUrl}MasterData/GetNurseList`);
  }

  GetStateList() {
    return this.http.get<MasterData[]>(`${this.apiBaseUrl}MasterData/GetStateList`);
  }

  GetMaritalStatusList() {
    return this.http.get<MasterData[]>(`${this.apiBaseUrl}MasterData/GetMaritalStatusList`);
  }

  GetGenderList() {
    return this.http.get<MasterData[]>(`${this.apiBaseUrl}MasterData/GetGenderList`);
  }

  GetCaseCoordinatorList() {
    return this.http.get<MasterData[]>(`${this.apiBaseUrl}MasterData/GetCaseCoordinatorList`);
  }

}
