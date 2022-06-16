
import {SignInComponent} from "./security/page/sign-in/sign-in.component"

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./public/home-customer/home.component";
import {SignUpComponent} from "./security/page/sign-up/sign-up.component";
import {ReservationComponent} from './reservations/page/reservation/reservation.component'
import {ReservationListComponent} from "./reservations/page/reservation-list/reservation-list.component";
import {SportFieldsComponent} from "./sportFields/page/sport-fields/sport-fields.component";
import {AuthRouteGuard} from "./security/service/auth.route.guard";
import {CustomerComponent} from "./customers/page/customer/customer.component";
import {HomeOwnerComponent} from "./public/home-owner/home-owner/home-owner.component";
import {OwnerProfileComponent} from "./owners/page/owner-profile/owner-profile.component";
const routes: Routes =[
  { path: '', redirectTo: '/auth/signIn', pathMatch: 'full'},
  {path: 'auth', loadChildren:() =>
   import('./modules/auth/auth.module').then((m) => m.AuthModule),canActivate:[AuthRouteGuard]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'customerProfile', component: CustomerComponent},
  {path: 'ownerProfile', component: OwnerProfileComponent},
  {path: 'reservation-list',component:ReservationListComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sport-fields', component: SportFieldsComponent,canActivate:[AuthRouteGuard]}
  ];

@NgModule({
  imports :[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
