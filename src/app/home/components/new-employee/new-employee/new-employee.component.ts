import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/share/constant/constant';
import { findDdlObjectFn, isNumberFn, StringToDateFn } from 'src/app/share/functionals/customFunctional';
import { InsertUpdateEmployeeModel } from 'src/app/share/models';
import { EmployeeService, MessageService } from 'src/app/share/services';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  id: number = 0;
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
    const paramID = this.route.snapshot.paramMap.get('id');
    console.log("id is ", paramID);
    if (paramID) {
      this.id = +paramID;
      this.loadClientData()
    }
  }

  loadClientData() {
    this.employeeService.GetByID(this.id).subscribe(res => {
      if (res) {
        console.log(res);

        this.createFormObject(res);
      }
    })
  }

  createFormObject(res: InsertUpdateEmployeeModel) {
    const data = {
      "ID": res.id,
      "Status": findDdlObjectFn([...this.StatusList], res.status),
      "DateOfHire": StringToDateFn(res.dateOfHire),
      "City": res.city,
      "SSN": res.ssn,
      "DateOfFirstCase": StringToDateFn(res.dateOfFirstCase),
      "County": res.county,
      "FirstName": res.firstName,
      "Email": res.email,
      "DOB": StringToDateFn(res.dob),
      "State": findDdlObjectFn([...this.StateList], res.state),
      "MiddleName": res.middleName,
      "EmployeeID": res.employeeID,
      "ZipCode": res.zipCode,
      "LastName": res.lastName,
      "Gender": findDdlObjectFn([...this.GenderList], res.gender),
      "EmergencyPhone": res.emergencyPhone,
      "CellPhone": res.cellPhone,
      "HRSupervisor": findDdlObjectFn([...this.HRSupervisor], res.hrSupervisor),
      "EmergencyContact": res.emergencyContact,
      "HomePhone": res.homePhone,
      "Ethnicity": findDdlObjectFn([...this.Ethnicity], res.ethnicity),
      "MaritalStatus": findDdlObjectFn([...this.MaritalStatusList], res.maritalStatus)
    };
    this.frm.setValue(data);
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

  emp?: InsertUpdateEmployeeModel;
  onCardClicked(item: string) {
    //const url = item == 'New Client' ? "/Client/Create" : "/Employee/Create";
    this.router.navigate(['Employee'])
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
    if (this.emp?.id != 0) {
      this.emp.modifiedBy = 1;
      this.emp.modifiedByIP = '192.168.125';
      this.employeeService.Put(this.emp).subscribe((res: any) => {
        this.handleResponse(res)
      });
    } else {
      this.emp.createdBy = 1;
      this.emp.createdByIP = '192.168.125';
      this.employeeService.Post(this.emp).subscribe((res: any) => {
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
      this.router.navigate(['Employee']);
    } else {
      this.messageService.Error(res.message);
    }
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
