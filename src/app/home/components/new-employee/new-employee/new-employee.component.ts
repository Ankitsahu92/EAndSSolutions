import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/share/constant/constant';
import { isNumberFn } from 'src/app/share/functionals/customFunctional';
import { InsertUpdateEmployeeModel } from 'src/app/share/models';
import { EmployeeService, MessageService } from 'src/app/share/services';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  showError: boolean = false;
  maxDate = new Date();
  frm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    this.frm = this.loadForm();
    this.route.data.subscribe(data => {
      this.GenderList = data['GenderList'];
      this.MaritalStatusList = data['MaritalStatusList'];
      this.StateList = data['StateList'];
      this.HRSupervisor = data['HRSupervisorList'];
      this.Ethnicity = data['EthnicityList'];
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
      DateOfHire: [''],
      City: ['', [Validators.required]],
      SSN: ['', [Validators.required]],
      DateOfFirstCase: [''],
      County: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(AppConstants.email)]],
      DOB: ['', [Validators.required]],
      State: ['', [Validators.required]],
      MiddleName: [''],
      EmployeeID: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      EmergencyPhone: ['', [Validators.required]],
      CellPhone: ['', [Validators.required]],
      HRSupervisor: ['', [Validators.required]],
      EmergencyContact: ['', [Validators.required]],
      HomePhone: ['', [Validators.required]],
      Ethnicity: [''],
      MaritalStatus: ['', [Validators.required]]
    });
  }

  //***********ddl State Begin ******* */
  StateList: any[] = [];
  GenderList: any[] = [];
  HRSupervisor: any[] = [];
  MaritalStatusList: any[] = [];
  Ethnicity: any[] = [];
  StatusList: any[] = [];
  //***********ddl State End ******* */

  // loadDdlValues() {
  //   this.StateList = [
  //     { name: 'New York', code: 'NY' },
  //     { name: 'Rome', code: 'RM' },
  //     { name: 'London', code: 'LDN' },
  //     { name: 'Istanbul', code: 'IST' },
  //     { name: 'Paris', code: 'PRS' }
  //   ];

  //   this.GenderList = [
  //     { name: 'Male', code: 'Male' },
  //     { name: 'Female', code: 'Female' },
  //   ];

  //   this.HRSupervisor = [
  //     { name: 'Nurse 1', code: 1 },
  //     { name: 'Nurse 2', code: 2 },
  //   ];

  //   this.MaritalStatusList = [
  //     { name: 'Married', code: 1 },
  //     { name: 'Single', code: 2 },
  //     { name: 'Divorced', code: 3 },
  //     { name: 'Separated', code: 4 },
  //     { name: 'Widowed', code: 5 },
  //     { name: 'Numerous', code: 6 },
  //     { name: 'Unknown', code: 7 },
  //   ];

  //   this.Ethnicity = [
  //     { name: 'Ethnicity 1', code: 1 },
  //     { name: 'Ethnicity 2', code: 2 },
  //   ];
  // }
  emp?: InsertUpdateEmployeeModel;
  onCardClicked(item: string) {
    const url = item == 'New Client' ? "/NewClient" : "/NewEmployee";
    this.router.navigate([url])
  }

  isNumber(evt: any) {
    return isNumberFn(evt)
  }

  onSave() {
    this.showError = true;
    if (this.frm.invalid) {
      this.messageService.Error("Please fill in all the required fields.");
      return false;
    }
    const data = this.frm.value;

    this.emp = {
      status: "" + data.Status?.id,
      isActive: true,
      id: data.ID,
      ssn: data.SSN,
      firstName: data.FirstName,
      middleName: data.MiddleName,
      lastName: data.LastName,
      cellPhone: this.cleanPhoneNum(data.CellPhone),
      homePhone: this.cleanPhoneNum(data.HomePhone),
      email: data.Email,
      dateOfHire: data.DateOfHire ? data.DateOfHire : null,
      dateOfFirstCase: data.DateOfFirstCase ? data.DateOfFirstCase : null,
      employeeID: data.EmployeeID,
      gender: "" + data.Gender?.id,
      hrSupervisor: "" + data.HRSupervisor?.id,
      ethnicity: "" + data.Ethnicity?.id,
      city: data.City,
      county: data.County,
      state: "" + data.State?.id,
      zipCode: data.ZipCode,
      emergencyPhone: this.cleanPhoneNum(data.EmergencyPhone),
      emergencyContact: this.cleanPhoneNum(data.EmergencyContact),
      maritalStatus: "" + data.MaritalStatus?.id,
      dob: data.DOB
    }
    if (this.emp.id > 0) {
      this.emp.modifiedBy = 1;
      //this.emp.modifiedOn = data.Active;
      this.emp.modifiedByIP = '192.168.125';
    } else {
      this.emp.createdBy = 1;
      //this.emp.createdOn = data.Active;
      this.emp.createdByIP = '192.168.125';
    }
    console.log("data", this.emp);
    this.employeeService.Post(this.emp).subscribe((res: any) => {
      console.log(res);
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

  hasError(fieldName: string, isDob: boolean = false) {
    // return "form-control is-invalid"
    if (isDob)
      return ` ${this.frm.get(fieldName)?.invalid && this.showError ? ' is-invalid' : ''}`
    else
      return `form-control ${this.frm.get(fieldName)?.invalid && this.showError ? ' is-invalid' : ''}`
  }

  // isRequired(fieldName: string) {
  //   const error: any = this.frm.get(fieldName)?.errors;
  //   console.log(this.frm.get(fieldName)?.validator());

  //   return error?.required ? 'col-6 lable  required' : 'col-6 lable ';
  // }

  cleanPhoneNum(data: string) {
    return data.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
  }
}
