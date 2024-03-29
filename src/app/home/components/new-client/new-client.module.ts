import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewClientRoutingModule } from './new-client-routing.module';
import { NewClientComponent } from './new-client/new-client.component';
import { ShareModule } from 'src/app/share/share.module';
import { ClientListComponent } from './client-list/client-list.component';


@NgModule({
  declarations: [
    NewClientComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    NewClientRoutingModule,
    ShareModule
  ]
})
export class NewClientModule { }
