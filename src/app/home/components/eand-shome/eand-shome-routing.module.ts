import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EAndSHomeComponent } from './eand-shome/eand-shome.component';

const routes: Routes = [
  { path: '', component: EAndSHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EAndSHomeRoutingModule { }
