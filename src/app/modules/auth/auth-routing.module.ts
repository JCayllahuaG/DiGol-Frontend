import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "../../security/page/sign-in/sign-in.component";
import {NgModule} from "@angular/core";
import {SignUpComponent} from "../../security/page/sign-up/sign-up.component";

const routes:Routes= [
  {path: 'signIn', component : SignInComponent},
  {path: '', redirectTo:'signIn'},
  {path: 'signUp', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule{}
