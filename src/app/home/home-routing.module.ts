import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseCoordinatorResolver, ClientStatusResolver, EmployeeStatusResolver, EthnicityResolver, GenderResolver, HRSupervisorResolver, MaritalStatusResolver, NurseResolver, StateResolver } from '../share/resolver';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'Home',
        loadChildren: () =>
          import('./components/eand-shome/eand-shome.module').then(
            (m) => m.EAndSHomeModule
          ),
      },
      {
        path: 'NewClient',
        loadChildren: () =>
          import('./components/new-client/new-client.module').then(
            (m) => m.NewClientModule
          ),
        resolve: {
          GenderList: GenderResolver,
          StateList: StateResolver,
          MaritalStatusList: MaritalStatusResolver,
          NurseResolverList: NurseResolver,
          CaseCoordinatorResolverList: CaseCoordinatorResolver,
          StatusList: ClientStatusResolver
        }
      },
      {
        path: 'NewEmployee',
        loadChildren: () =>
          import('./components/new-employee/new-employee.module').then(
            (m) => m.NewEmployeeModule
          ), resolve: {
            GenderList: GenderResolver,
            StateList: StateResolver,
            MaritalStatusList: MaritalStatusResolver,
            EthnicityList: EthnicityResolver,
            HRSupervisorList: HRSupervisorResolver,
            StatusList: EmployeeStatusResolver
          }
      },
      { path: '', redirectTo: '/Home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
