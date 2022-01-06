import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenderResolver, StateResolver, MaritalStatusResolver, NurseResolver, CaseCoordinatorResolver, ClientStatusResolver } from 'src/app/share/resolver';
import { ClientListComponent } from './client-list/client-list.component';
import { NewClientComponent } from './new-client/new-client.component';

const routes: Routes = [
  { path: '', component: ClientListComponent },
  {
    path: 'Create', component: NewClientComponent,
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
    path: 'Update/:id'
    //path: 'Create/:id'
    , component: NewClientComponent,
    resolve: {
      GenderList: GenderResolver,
      StateList: StateResolver,
      MaritalStatusList: MaritalStatusResolver,
      NurseResolverList: NurseResolver,
      CaseCoordinatorResolverList: CaseCoordinatorResolver,
      StatusList: ClientStatusResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewClientRoutingModule { }
