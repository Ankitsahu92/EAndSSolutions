import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'Client',
        loadChildren: () =>
          import('./components/new-client/new-client.module').then(
            (m) => m.NewClientModule
          )
      },
      {
        path: 'Employee',
        loadChildren: () =>
          import('./components/new-employee/new-employee.module').then(
            (m) => m.NewEmployeeModule
          )
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
