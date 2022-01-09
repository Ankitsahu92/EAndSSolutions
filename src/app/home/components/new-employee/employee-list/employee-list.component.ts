import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InsertUpdateEmployeeModel } from 'src/app/share/models';
import { EmployeeService } from 'src/app/share/services';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  empList: InsertUpdateEmployeeModel[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.employeeService.Get().subscribe(res => {
      if (res) {
        this.empList = res;
        console.log(res);

      }
    });
  }

  action(type: string, obj: InsertUpdateEmployeeModel) {
    if (type == 'update') {
      this.router.navigate(['Employee', 'Update', obj.id])
    } else {

    }
  }

  onCardClicked(item: string) {
    const url = item == 'New Client' ? "/Client/Create" : "/Employee/Create";
    this.router.navigate([url])
  }
}
