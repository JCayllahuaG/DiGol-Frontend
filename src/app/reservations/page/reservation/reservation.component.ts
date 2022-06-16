import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ReservationService} from "../../service/reservation.service";
import {Reservation} from "../../model/reservation";
import {RegisterI} from "../../../security/model/register.interface";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationData: Reservation;
  filteredOptions : Observable<string[]>;
  options: string[] = ["Football 5"," Football 7"];
  reservationForm: FormGroup = new FormGroup({});
  get f() { return this.reservationForm.controls; }

  constructor(private router: Router,private toastService:NgToastService,private builder: FormBuilder, private reservationService: ReservationService) {
    this.reservationData = {} as Reservation;
    this.reservationForm= builder.group(
      {
        name: new FormControl('',[Validators.maxLength(20), Validators.required]),
        soccerFieldName: new FormControl('', Validators.required),
        soccerFieldType: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        hour: new FormControl('', Validators.required),
        payment: new FormControl('',Validators.required),
      });
    this.filteredOptions = this.reservationForm.controls["soccerFieldType"].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value ||'')),
    );
  }
  ngOnInit() :void{
  }
  private _filter(value:string) :string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  cancelReservation(){
    return;
  }
  AddReservation(form:RegisterI) {
    console.log(this.reservationForm.value);
    this.reservationService.addReservation(form).subscribe( data =>{
      this.toastService.success({detail:"Reservation Created",summary:"Reservation added",duration:5000})
    });
  }
}
