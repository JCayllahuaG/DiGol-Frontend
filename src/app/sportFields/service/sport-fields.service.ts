import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {SportField} from "../model/sportField";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SportFieldsService {

  basePath='http://localhost:3000/sportFields';
  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }
  currentReservation: Array<SportField>=[];

  handleError(error : HttpErrorResponse)
  {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend return code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError( () => new Error(`Something happened with request, please try again later`));
  }
  getAll(): Observable<SportField> {
    return this.http.get<SportField>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getById(id:number): Observable<SportField> {
    const url=`${this.basePath}/${id}`;
    return this.http.get<SportField>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )

  }
}
