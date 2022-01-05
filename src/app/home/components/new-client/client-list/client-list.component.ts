import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/share/services';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

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
