import { Injectable } from '@angular/core';
import {RegisterI} from '../model/register.interface'
import {ResponseI} from '../model/response.interface'
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, observable, Observable, of, retry, throwError} from "rxjs";
import {User} from "../model/user";
import {SportField} from "../../sportFields/model/sportField";
import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {NgToastService} from 'ng-angular-popup'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentId=0;
  basePath:string="http://localhost:3000/users";
  basePathLog:string="http://localhost:3000/usersLogged";
  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  currentUser :BehaviorSubject<any> = new BehaviorSubject(null);
  nameUserLS:string = 'access-Token';
  jwtHelper = new JwtHelperService();
  constructor(private toastService:NgToastService,private http:HttpClient, private router:Router) {
    this.loadUserInfo();
  }


  loadUserInfo(){
    const userData = this.currentUser.getValue();
    if(!userData){
      const accessToken = localStorage.getItem('access-Token');
      if (accessToken!=null) {
        const decryptedUser = this.jwtHelper.decodeToken(accessToken);
        const data = {
          accessToken : accessToken,
          refreshToken : localStorage.getItem('refresh-Token'),
          username: decryptedUser.username,
          userId: decryptedUser.username,
          tokenExpiration: decryptedUser.exp
        };
        this.currentUser.next(data);
      }
    }


  }

logout(){
  localStorage.removeItem(this.nameUserLS);
  this.currentUser.next(null);
  this.router.navigate(['auth/signIn']);

}
searchByEmail(email:string){
  return this.http.get<any>(this.basePathLog+`?email=${email}`).subscribe(res=>{
    const userEmail = res.find((a:any)=>{
      console.log("Email found is: ",a.email);
      return a.email === email;
    });
    if(userEmail)
      console.log("email found");
    else{
      console.log("email not registered");
    }
  });
}

Login(form: any){
  return this.http.get<any>(this.basePath).subscribe(res=>{
    const user= res.find((a:any)=>{
      return a.email === form.email && a.password === form.password
    });
    if(user){
      const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
      const refreshToken="dummy";
      this.http.post<User>(this.basePathLog,form);
      localStorage.setItem("access-Token",accessToken);
      localStorage.setItem("refresh-Token",refreshToken);

      const decryptedUser = this.jwtHelper.decodeToken(accessToken);
      console.log(decryptedUser);
      const data = {
        accessToken : accessToken,
        refreshToken : refreshToken,
        username: decryptedUser.username,
        userId: decryptedUser.username,
        tokenExpiration: decryptedUser.exp
      };
     this.currentUser.next(data);
     this.toastService.success({detail:"User Logged Successfully!!",summary:"Logged",duration:5000})
     this.router.navigate(['sport-fields']);
    }else {
      this.toastService.error({detail:"User Not Founded",summary:"Login Failed",duration:5000})
    }
    },
    err=>{
      alert("Something went wrong!!")
  });
}
PostLogin(form:User):Observable<ResponseI>{
    return this.http.post<ResponseI>(this.basePathLog,form).pipe(retry(2),catchError(this.handleError));
  }

//Register Methods
  Register(form:RegisterI):Observable<ResponseI>{
    this.currentId++;
    return this.http.post<ResponseI>(`${this.basePath}`, form).pipe(retry(2),catchError(this.handleError));

  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) =>{
        const control= formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if(matchingControl.errors && !matchingControl.errors['confirmedValidator'])
        {
          return
        }
        if(control.value!== matchingControl.value){
          matchingControl.setErrors({confirmedValidator: true});
        }
        else {
          matchingControl.setErrors(null);
        }
      }
    }
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent)
      console.log(`An error occurred: ${error.error.message}`);
    else {
      console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
    }
    return throwError(()=>new Error('something happenned with request, please try again later'));
  }


}
