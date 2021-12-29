import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  frm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.frm = this.loadForm();
    this.route.data.subscribe(data => {
      this.GenderList = data['GenderList'];
      this.MaritalStatusList = data['MaritalStatusList'];
      this.StateList = data['StateList'];
      this.NurseList = data['NurseResolverList'];
      this.CaseCoordinatorList = data['CaseCoordinatorResolverList'];
    });
  }

  ngOnInit(): void {
    // this.loadDdlValues();
  }

  loadForm() {
    return this.fb.group({
      Active: [true, [Validators.required]],
      BillTo: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      MiddleName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      CellPhone: ['', [Validators.required]],
      Ethnicity: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      InsurenceID: ['', [Validators.required]],
      NoOfChildren: ['', [Validators.required]],
      SSN: ['', [Validators.required]],
      ClientID: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Nurse: ['', [Validators.required]],
      CaseCoordinator: ['', [Validators.required]],
      MaritalStatus: ['', [Validators.required]],
      City: ['', [Validators.required]],
      County: ['', [Validators.required]],
      State: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
      ReferredBy: ['', [Validators.required]],
      EmergencyContact: ['', [Validators.required]],
      CaseWorkerPhone: ['', [Validators.required]],
      CaseWorkerEmail: ['', [Validators.required]],
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
