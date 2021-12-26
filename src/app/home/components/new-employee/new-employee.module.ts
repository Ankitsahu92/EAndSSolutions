import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEmployeeRoutingModule } from './new-employee-routing.module';
import { NewEmployeeComponent } from './new-employee/new-employee.component';


@NgModule({
  declarations: [
    NewEmployeeComponent
  ],
  imports: [
    CommonModule,
    NewEmployeeRoutingModule
  ]
})
export class NewEmployeeModule { }
