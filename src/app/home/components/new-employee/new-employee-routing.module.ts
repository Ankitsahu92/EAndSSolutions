import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenderResolver, StateResolver, MaritalStatusResolver, EthnicityResolver, HRSupervisorResolver, EmployeeStatusResolver } from 'src/app/share/resolver';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  {
    path: 'Create', component: NewEmployeeComponent, resolve: {
      GenderList: GenderResolver,
      StateList: StateResolver,
      MaritalStatusList: MaritalStatusResolver,
      EthnicityList: EthnicityResolver,
      HRSupervisorList: HRSupervisorResolver,
      StatusList: EmployeeStatusResolver
    }
  },
  {
    path: 'Update/:id', component: NewEmployeeComponent, resolve: {
      GenderList: GenderResolver,
      StateList: StateResolver,
      MaritalStatusList: MaritalStatusResolver,
      EthnicityList: EthnicityResolver,
      HRSupervisorList: HRSupervisorResolver,
      StatusList: EmployeeStatusResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewEmployeeRoutingModule { }
