// angular packages
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  @Output() aClickedEvent = new EventEmitter<string>();
  AClicked(msg: string) {
    this.aClickedEvent.emit(msg);
  }
  constructor(private http: HttpClient) { }

  public get<T>(apiPath): Observable<T> {
    return this.http.get<T>(apiPath);
  }
  public post<T>(apiPath, data): Observable<any> {
    return this.http.post<any>(apiPath, data);
  }
}
