import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EAndSHomeRoutingModule } from './eand-shome-routing.module';
import { EAndSHomeComponent } from './eand-shome/eand-shome.component';


@NgModule({
  declarations: [
    EAndSHomeComponent
  ],
  imports: [
    CommonModule,
    EAndSHomeRoutingModule
  ]
})
export class EAndSHomeModule { }
