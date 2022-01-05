import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/share/services';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onCardClicked(item: string) {
    const url = item == 'New Client' ? "/Client/Create" : "/Employee/Create";
    this.router.navigate([url])
  }
}
