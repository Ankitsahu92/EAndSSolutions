import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MasterData } from '../models/MasterDataModel';
import { MasterDataService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class EthnicityResolver implements Resolve<MasterData[]> {
  constructor(private service: MasterDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MasterData[]> {
    return this.service.GetEthnicityList();
  }
}
