import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  ActiveChecked: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.loadDdlValues();
  }

  //***********ddl State Begin ******* */
  selectedState: any;
  StateList: any[] = []
  //***********ddl State End ******* */

  loadDdlValues() {
    this.StateList = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
}
