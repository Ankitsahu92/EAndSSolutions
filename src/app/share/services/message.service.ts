import { Injectable } from '@angular/core';
import { MessageService as NgPrimeMessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private messageService: NgPrimeMessageService) { }


  Success(message: string) {
    this.messageService.clear();
    this.messageService.add({ severity: 'success', detail: message });
  }

  Info(message: string) {
    this.messageService.clear();
    this.messageService.add({ severity: 'info', detail: message });
  }


  Warn(message: string) {
    this.messageService.clear();
    this.messageService.add({ severity: 'warn', detail: message });
  }


  Error(message: string) {
    this.messageService.clear();
    this.messageService.add({ severity: 'error', detail: message });
  }

  Custom(message: string) {
    this.messageService.clear();
    this.messageService.add({ severity: 'custom', detail: message });
  }

}
