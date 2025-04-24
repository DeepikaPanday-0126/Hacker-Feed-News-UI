import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
  
    return next.handle(req).pipe(
      catchError(error => {
        console.error('HTTP Error:', error);
        // Optionally show toast or alert here
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hide())
    );
  }
}






