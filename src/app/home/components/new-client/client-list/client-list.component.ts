import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InsertUpdateClientModel } from 'src/app/share/models';
import { ClientService, EmployeeService } from 'src/app/share/services';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clientList: InsertUpdateClientModel[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.clientService.Get().subscribe(res => {
      if (res) {
        this.clientList = res;
        console.log(res);

      }
    });
  }

  action(type: string, obj: InsertUpdateClientModel) {
    if (type == 'update') {
      this.router.navigate(['Client', 'Update', obj.id])
    } else {

    }
  }
  onCardClicked(item: string) {
    const url = item == 'New Client' ? "/Client/Create" : "/Employee/Create";
    this.router.navigate([url])
  }

}
