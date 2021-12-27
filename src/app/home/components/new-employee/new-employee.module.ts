import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEmployeeRoutingModule } from './new-employee-routing.module';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    NewEmployeeComponent
  ],
  imports: [
    CommonModule,
    NewEmployeeRoutingModule,
    ShareModule
  ]
})
export class NewEmployeeModule { }
