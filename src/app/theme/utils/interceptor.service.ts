
// angular packages
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }

  // local variables.
  request;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    if (token != null) {
      this.request = req.clone({
        headers: new HttpHeaders({
          'Authorization': "Bearer " + token
        })
      });
    } else {
      this.request = req.clone({
        headers: new HttpHeaders({
        })
      });
    }
    return next.handle(this.request);
  }
}