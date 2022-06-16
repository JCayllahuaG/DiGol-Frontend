import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import { AuthService} from '../../service/auth.service'
import {RegisterI} from "../../model/register.interface";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {ResponseI} from "../../model/response.interface";
import {catchError, map, observable, Observable, startWith} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  lastId:number;
  basePathC:string="http://localhost:3000/customers";
  basePathO:string="http://localhost:3000/owners";
  submitted:boolean = false;

  filteredOptions : Observable<string[]>;
  options: string[] = ['Customer','Owner']
  loginForm: FormGroup = new FormGroup({});
  get f() { return this.loginForm.controls; }
  constructor(private toastService:NgToastService,private http:HttpClient,private builder: FormBuilder,private authService: AuthService, public router: Router) {
    this.loginForm= builder.group(
      {
      name: new FormControl('',Validators.maxLength(20)),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
      password2: new FormControl('', [Validators.required])
    },
      {
        validators: this.authService.ConfirmedValidator('password', 'password2')
      }
    );



    this.filteredOptions = this.loginForm.controls["type"].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value ||'')),
    );

  }
  ngOnInit(): void {

  }
  ch(e:any) {
    if (e.checked) {
      this.loginForm.controls['password'].setValidators([Validators.required])
      this.loginForm.controls['password'].updateValueAndValidity()
    } else {
      this.loginForm.controls['password'].setValidators(null)
      this.loginForm.controls['password'].updateValueAndValidity()
    }
  }
  get get_password(){return this.loginForm.get('password');}
  get get_password2(){return this.loginForm.get('password2');}
  private _filter(value:string) :string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onLogin(form:RegisterI){
    this.submitted=true;
    if(this.loginForm.invalid)
      return;
    this.authService.Register(form).subscribe( data =>{
      this.toastService.success({detail:"Sign Up Successful",summary:"Sign Up",duration:5000})
      alert("Sign Up Successful");
      this.router.navigate(['sign-in']);
    });
  }

}
