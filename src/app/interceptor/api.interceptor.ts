import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone request and add a fake auth token
    const authReq = req.clone();

    console.log('Request:', authReq);

    return next.handle(authReq).pipe(
      tap({
        next: event => {
          if (event instanceof HttpResponse) {
            console.log('Response:', event);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
        }
      })
    );
  }
}






