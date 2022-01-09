import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneMaskDirective } from './directive/phone-mask.directive';

//import { MessageService } from 'primeng/api';
const primengModules = [
  DropdownModule,
  InputSwitchModule,
  CalendarModule,
  InputMaskModule,
  TableModule,

  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    PhoneMaskDirective
  ],
  imports: [
    CommonModule,
    ...primengModules
  ],
  exports: [
    ...primengModules
  ],
  providers: []
})
export class ShareModule { }
