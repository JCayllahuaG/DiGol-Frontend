import {Component, OnInit} from '@angular/core';
import {AuthService} from "./security/service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user = {
    username:'',
    id:''
  };
  constructor(private authService:AuthService) {
  }
  title = 'New-Frontend';

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value =>{
      if(value){
        this.user.id = value.id;
        this.user.username = value.username;
      }

    })
  }
  Logged(){
    const logged=localStorage.getItem('access-Token');
    if(logged)
      return true;
    else
    {
      return false;
    }
  }
  Logout(){
    this.authService.logout();
  }
}
