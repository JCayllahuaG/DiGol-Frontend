import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {RegisterI} from "../../model/register.interface";
import {User} from "../../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginSubmitted = false;
  jwtHelper= new JwtHelperService();
  constructor(private toastService:NgToastService,private authService: AuthService, private router:Router ) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)])
  })
  ngOnInit(): void {
  }
  email:string;
  Login(form:User) {
    this.authService.Login(this.loginForm.value);
    this.email=this.loginForm.controls['email'].value;
    console.log("Obteniendo el email de loginForm: ",this.email);
    this.authService.searchByEmail(this.email);
  }



/*
  login() {
    this.authService.Login().subscribe(res=>{
      const user= res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
        const refreshToken="dummy";

        localStorage.setItem("access-Token", accessToken);
        localStorage.setItem("refresh-Token",refreshToken);


        const decryptedUser=this.jwtHelper.decodeToken(accessToken);
        console.log("Decrypted User",decryptedUser);
        const data = {
          accessToken : accessToken,
          refreshToken : refreshToken,
          tokenExpiration: decryptedUser.exp,
          userid: decryptedUser.userid,
          username: decryptedUser.username
        };
        this.authService.currentUser.next(data);
        alert("Login Success");
        this.loginForm.reset();
        this.router.navigate(['sport-fields']);
      }else {
        alert("User Not Founded");
      }
    },
      err=>{
      alert("Something went wrong!!")
      });
  }
*/
  goToSignUp() {
    this.router.navigate(['auth/signUp']);
  }
  Logout(){
    this.authService.logout();
  }
}
