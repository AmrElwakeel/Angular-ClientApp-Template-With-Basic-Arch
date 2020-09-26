import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoreService } from '../core/core.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private core: CoreService) { }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${path}`, { params })
      .pipe(catchError(e => this.core.handleError<T>()));
  }

  getById<T>(path: string, id: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${path}/${id}`, { params })
      .pipe(catchError(e => this.core.handleError<T>()));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${path}`, body)
      .pipe(catchError(e => this.core.handleBaseError(e)));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${path}`, body)
      .pipe(catchError(e => this.core.handleBaseError(e)));
  }

  delete(path: string, params: any = new HttpParams()): Observable<any> {
    return this.http.delete(`${path}`, { params })
      .pipe(catchError(e => this.core.handleBaseError(e)));
  }

}
