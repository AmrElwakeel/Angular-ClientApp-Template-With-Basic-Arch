import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  handleBaseError(error: any) {
    return throwError(error);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client side error : ', errorResponse.error.message);
      } else {
        console.error('Server side error : ', errorResponse.error);
      }
      return of(result as T);
    }
  }

}
