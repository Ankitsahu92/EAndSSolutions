import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const primengModules = [
  DropdownModule,
  InputSwitchModule,
  CalendarModule,

  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...primengModules
  ],
  exports: [
    ...primengModules
  ]
})
export class ShareModule { }
