import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumberFn } from 'src/app/share/functionals/customFunctional';

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
    this.route.data.subscribe(data => {
      this.GenderList = data['GenderList'];
      this.MaritalStatusList = data['MaritalStatusList'];
      this.StateList = data['StateList'];
      this.HRSupervisor = data['HRSupervisorList'];
      this.Ethnicity = data['EthnicityList'];
    });
  }

  ngOnInit(): void {
    // this.loadDdlValues();
  }

  loadForm() {
    return this.fb.group({
      Active: [true, [Validators.required]],
      DateOfHire: ['', [Validators.required]],
      City: ['', [Validators.required]],
      SSN: ['', [Validators.required]],
      DateOfFirstCase: ['', [Validators.required]],
      County: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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
      MaritalStatus: ['', [Validators.required]]
    });
  }

  //***********ddl State Begin ******* */
  StateList: any[] = [];
  GenderList: any[] = [];
  HRSupervisor: any[] = [];
  MaritalStatusList: any[] = [];
  Ethnicity: any[] = [];
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

    this.HRSupervisor = [
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

    this.Ethnicity = [
      { name: 'Ethnicity 1', code: 1 },
      { name: 'Ethnicity 2', code: 2 },
    ];
  }

  onCardClicked(item: string) {
    const url = item == 'New Client' ? "/NewClient" : "/NewEmployee";
    this.router.navigate([url])
  }

  isNumber(evt: any) {
    return isNumberFn(evt)
  }
}
