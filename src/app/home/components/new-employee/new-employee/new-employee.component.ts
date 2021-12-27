import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  frm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.frm = this.loadForm();
  }

  ngOnInit(): void {
    this.loadDdlValues();
  }

  loadForm() {
    return this.fb.group({
      Active: [true, [Validators.required]],
      DateOfHire: ['', [Validators.required]],
      City: ['', [Validators.required]],
      InsurenceID: ['', [Validators.required]],
      BillTo: ['', [Validators.required]],
      ClientID: ['', [Validators.required]],
      NoOfChildren: ['', [Validators.required]],
      Nurse: ['', [Validators.required]],
      CaseCoordinator: ['', [Validators.required]],
      CaseWorkerPhone: ['', [Validators.required]],
      CaseWorkerEmail: ['', [Validators.required]],
      ReferredBy: ['', [Validators.required]],
      // CaseWorkerPhone: ['', [Validators.required]],
      SSN: ['', [Validators.required]],
      DateOfFirstCase: ['', [Validators.required]],
      County: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      State: ['', [Validators.required]],
      MiddleName: ['', [Validators.required]],
      EmployeeID: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      EmergencyPhone: ['', [Validators.required]],
      CellPhone: ['', [Validators.required]],
      HRSupervisor: ['', [Validators.required]],
      EmergencyContact: ['', [Validators.required]],
      HomePhone: ['', [Validators.required]],
      Ethnicity: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      MaritalStatus: ['', [Validators.required]],
    });
  }

  //***********ddl State Begin ******* */
  StateList: any[] = [];
  GenderList: any[] = [];
  NurseList: any[] = [];
  MaritalStatusList: any[] = [];
  CaseCoordinatorList: any[] = [];
  //***********ddl State End ******* */

  loadDdlValues() {
    this.StateList = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.GenderList = [
      { name: 'Male', code: 'Male' },
      { name: 'Female', code: 'Female' },
    ];

    this.NurseList = [
      { name: 'Nurse 1', code: 1 },
      { name: 'Nurse 2', code: 2 },
    ];

    this.MaritalStatusList = [
      { name: 'Married', code: 1 },
      { name: 'Single', code: 2 },
      { name: 'Divorced', code: 3 },
      { name: 'Separated', code: 4 },
      { name: 'Widowed', code: 5 },
      { name: 'Numerous', code: 6 },
      { name: 'Unknown', code: 7 },
    ];

    this.CaseCoordinatorList = [
      { name: 'Case Coordinator 1', code: 1 },
      { name: 'Case Coordinator 2', code: 2 },
    ];
  }

  onCardClicked(item: string) {
    const url = item == 'New Client' ? "/NewClient" : "/NewEmployee";
    this.router.navigate([url])
  }
}