import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './security/page/sign-in/sign-in.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {AppRoutingModule} from "./app-routing.module";
import {MatIconModule} from "@angular/material/icon";
import { HomeComponent } from './public/home-customer/home.component';
import { SignUpComponent } from './security/page/sign-up/sign-up.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ReservationComponent } from './reservations/page/reservation/reservation.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ReservationListComponent } from './reservations/page/reservation-list/reservation-list.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CustomerComponent } from './customers/page/customer/customer.component';
import {MatSortModule} from "@angular/material/sort";
import { SportFieldsComponent } from './sportFields/page/sport-fields/sport-fields.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { UserProfileComponent } from './users/page/user-profile/user-profile.component';
import { HomeOwnerComponent } from './public/home-owner/home-owner/home-owner.component';
import {AuthService} from "./security/service/auth.service";
import {AuthRouteGuard} from "./security/service/auth.route.guard";
import {MatMenuModule} from "@angular/material/menu";
import { OwnerProfileComponent } from './owners/page/owner-profile/owner-profile.component';
import {NgToastModule} from "ng-angular-popup";
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    SignUpComponent,
    ReservationComponent,
    ReservationListComponent,
    CustomerComponent,
    SportFieldsComponent,
    UserProfileComponent,
    HomeOwnerComponent,
    OwnerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    NgToastModule
  ],
  providers: [AuthRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
