import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewClientRoutingModule } from './new-client-routing.module';
import { NewClientComponent } from './new-client/new-client.component';


@NgModule({
  declarations: [
    NewClientComponent
  ],
  imports: [
    CommonModule,
    NewClientRoutingModule
  ]
})
export class NewClientModule { }
