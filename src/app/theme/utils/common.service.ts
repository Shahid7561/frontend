// angular packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public get<T>(apiPath): Observable<T> {
    return this.http.get<T>(apiPath);
  }
  public post<T>(apiPath, data): Observable<any> {
    return this.http.post<any>(apiPath, data);
  }
}
