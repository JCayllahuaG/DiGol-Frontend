import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Reservation} from "../model/reservation";
import {RegisterI} from "../../security/model/register.interface";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  //Reservation endpoint
  basePath='http://localhost:3000/reservations';

  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }

  //API Error Handling

  handleError( error: HttpErrorResponse){
    if(error.error instanceof  ErrorEvent)
      console.log(`An error ocurred: ${error.error.message}`)
    else {
      console.error(
        `Backend return code ${error.status}, body was ${error.error}`
      );
    }
    return throwError(()=> new Error(`Something happened with request, please try again later`));
  }
  //Get All Reservations

  addReservation(form:RegisterI){
    return this.http.post<Reservation>(this.basePath, form)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getAll() : Observable<Reservation>{
    return this.http.get<Reservation>(this.basePath, this.httpOptions)
      .pipe(retry(2),
        catchError(this.handleError)
      );
  }


}
