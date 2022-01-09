import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService, EmitEvent, Events } from '../service/spinner.service';
import { MessageService } from 'src/app/share/services';

@Injectable()
export class SpinnerRequestResponseInterceptor implements HttpInterceptor {
  constructor(private service: SpinnerService, private messageService: MessageService,) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const randomTime = this.getRandomIntInclusive(0, 1500);
    const started = Date.now();
    this.service.emit(new EmitEvent(Events.httpRequest));
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          this.service.emit(new EmitEvent(Events.httpResponse));
        }
      }),
      catchError((error) => {
        console.log("catchError", error);
        this.messageService.Error("Something Went Wrong!!!");
        this.service.emit(new EmitEvent(Events.httpResponseError));
        return throwError(error.message);
      })
    );
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }
}
