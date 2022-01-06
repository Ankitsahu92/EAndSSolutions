import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumberFn, findDdlObjectFn } from 'src/app/share/functionals/customFunctional';
import { InsertUpdateClientModel } from 'src/app/share/models';
import { ClientService, MessageService } from 'src/app/share/services';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  [x: string]: any;
  id: number = 0;
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
    const paramID = this.route.snapshot.paramMap.get('id');
    if (paramID) {
      this.id = +paramID;
      this.loadClientData();
    }
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

  loadClientData() {
    this.clientService.GetByID(this.id).subscribe(res => {
      if (res) {
        this.createFormObject(res);
      }
    })
  }

  createFormObject(res: InsertUpdateClientModel) {
    const data = {
      "ID": res.id,
      "Status": findDdlObjectFn([...this.StatusList], res.status),
      "City": res.city,
      "InsurenceID": res.insurenceID,
      "BillTo": res.billTo,
      "ClientID": res.clientID,
      "NoOfChildren": res.noOfChildren,
      "Nurse": findDdlObjectFn([...this.NurseList], res.nurse),
      "CaseCoordinator": findDdlObjectFn([...this.CaseCoordinatorList], res.caseCoordinator),
      "CaseWorkerPhone": res.caseWorkerPhone,
      "CaseWorkerEmail": res.caseWorkerEmail,
      "ReferredBy": res.referredBy,
      "SSN": res.ssn,
      "County": res.county,
      "FirstName": res.firstName,
      "State": findDdlObjectFn([...this.StateList], res.state),
      "MiddleName": res.middleName,
      "ZipCode": res.zipCode,
      "LastName": res.lastName,
      "Gender": findDdlObjectFn([...this.GenderList], res.gender),
      "CellPhone": res.cellPhone,
      "EmergencyContact": res.emergencyContact,
      "Ethnicity": res.ethnicity,
      "Email": res.email,
      "MaritalStatus": findDdlObjectFn([...this.MaritalStatusList], res.maritalStatus)
    }
    this.frm.setValue(data);
  }

  //***********ddl State Begin ******* */
  StateList: any[] = [];
  GenderList: any[] = [];
  NurseList: any[] = [];
  MaritalStatusList: any[] = [];
  CaseCoordinatorList: any[] = [];
  StatusList: any[] = [];
  //***********ddl State End ******* */

  onCardClicked(item: string) {

    const url = 'Client';
    //item == 'New Client' ? "/Client/Create" : "/Employee/Create";
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
      this.messageService.Error("Please fill in all the required fields.");
      return false;
    }
    const data = this.frm.value;

    this.client = {
      id: data.ID,
      status: "" + data.Status?.id,
      isActive: true,
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
    if (this.client?.id != 0) {
      this.client.modifiedBy = 1;
      this.client.modifiedByIP = '192.168.125';
      this.clientService.Put(this.client).subscribe((res: any) => {
        this.handleResponse(res)
      });
    } else {
      this.client.createdBy = 1;
      this.client.createdByIP = '192.168.125';
      this.clientService.Post(this.client).subscribe((res: any) => {
        this.handleResponse(res)
      });
    }
    return true;
  }

  handleResponse(res: any) {
    if (res && res.success) {
      this.messageService.Success(res.message);
      this.showError = false;
      this.frm.reset();
      this.router.navigate(['Client']);
    } else {
      this.messageService.Error(res.message);
    }
  }

  cleanPhoneNum(data: string) {
    return data.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
  }
}
