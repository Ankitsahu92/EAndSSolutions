import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumberFn } from 'src/app/share/functionals/customFunctional';
import { InsertUpdateClientModel } from 'src/app/share/models';
import { ClientService, MessageService } from 'src/app/share/services';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  frm: FormGroup;
  showError: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private clientService: ClientService
  ) {
    this.frm = this.loadForm();
    this.route.data.subscribe(data => {
      this.GenderList = data['GenderList'];
      this.MaritalStatusList = data['MaritalStatusList'];
      this.StateList = data['StateList'];
      this.NurseList = data['NurseResolverList'];
      this.CaseCoordinatorList = data['CaseCoordinatorResolverList'];
      this.StatusList = data['StatusList'];
    });
  }

  ngOnInit(): void {
    // this.loadDdlValues();
  }

  loadForm() {
    return this.fb.group({
      ID: [0, [Validators.required]],
      //Active: [true, [Validators.required]],
      Status: ['', [Validators.required]],
      City: ['', [Validators.required]],
      InsurenceID: ['', [Validators.required]],
      BillTo: ['', [Validators.required]],
      ClientID: ['', [Validators.required]],
      NoOfChildren: [''],
      Nurse: ['', [Validators.required]],
      CaseCoordinator: ['', [Validators.required]],
      CaseWorkerPhone: ['', [Validators.required]],
      CaseWorkerEmail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      ReferredBy: ['', [Validators.required]],
      // CaseWorkerPhone: ['', [Validators.required]],
      SSN: ['', [Validators.required]],
      County: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      State: ['', [Validators.required]],
      MiddleName: [''],
      ZipCode: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      CellPhone: ['', [Validators.required]],
      EmergencyContact: ['', [Validators.required]],
      Ethnicity: [''],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      MaritalStatus: [''],
    });
  }

  //***********ddl State Begin ******* */
  StateList: any[] = [];
  GenderList: any[] = [];
  NurseList: any[] = [];
  MaritalStatusList: any[] = [];
  CaseCoordinatorList: any[] = [];
  StatusList: any[] = [];
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

  isNumber(evt: any) {
    return isNumberFn(evt)
  }
  hasError(fieldName: string, isDob: boolean = false) {
    // return "form-control is-invalid"
    if (isDob)
      return ` ${this.frm.get(fieldName)?.invalid && this.showError ? ' is-invalid' : ''}`
    else
      return `form-control ${this.frm.get(fieldName)?.invalid && this.showError ? ' is-invalid' : ''}`
  }

  client?: InsertUpdateClientModel;
  onSave() {
    this.showError = true;
    if (this.frm.invalid) {
      console.log(this.frm);

      this.messageService.Error("Please fill in all the required fields.");
      return false;
    }
    const data = this.frm.value;

    this.client = {
      id: data.ID,
      isActive: data.Active,
      city: data.City,
      insurenceID: data.InsurenceID,
      billTo: data.BillTo,
      clientID: data.ClientID,
      noOfChildren: data.NoOfChildren,
      nurse: "" + data.Nurse?.id,
      caseCoordinator: "" + data.CaseCoordinator?.id,
      caseWorkerPhone: this.cleanPhoneNum(data.CaseWorkerPhone),
      caseWorkerEmail: data.CaseWorkerEmail,
      referredBy: data.ReferredBy,
      ssn: data.SSN,
      county: data.County,
      firstName: data.FirstName,
      state: "" + data.State?.id,
      middleName: data.MiddleName,
      zipCode: data.ZipCode,
      lastName: data.LastName,
      gender: "" + data.Gender?.id,
      cellPhone: this.cleanPhoneNum(data.CellPhone),
      emergencyContact: this.cleanPhoneNum(data.EmergencyContact),
      ethnicity: data.Ethnicity,
      email: data.Email,
      maritalStatus: "" + data.MaritalStatus?.id,

    }
    if (this.client?.id > 0) {
      this.client.modifiedBy = 1;
      //this.emp.modifiedOn = data.Active;
      this.client.modifiedByIP = '192.168.125';
    } else {
      this.client.createdBy = 1;
      //this.emp.createdOn = data.Active;
      this.client.createdByIP = '192.168.125';
    }
    // console.log("data", this.client);
    this.clientService.Post(this.client).subscribe((res: any) => {
      console.log(res, JSON.stringify(res));
      if (res && res.success) {
        this.messageService.Success(res.message);
        this.showError = false;
        this.frm.reset();
      } else {
        this.messageService.Error(res.message);
      }
    });
    return true;
  }


  cleanPhoneNum(data: string) {
    return data.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
  }
}
