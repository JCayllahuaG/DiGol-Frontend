import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Reservation} from "../../model/reservation";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from '../../service/reservation.service'

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements AfterViewInit {

  reservationData: Reservation;
  dataSource: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['id','customerId','sportFieldId','sportFieldType','date','hour','payment'];


  @ViewChild(MatPaginator)paginator:MatPaginator;
  @ViewChild(MatSort)sort:MatSort;



  constructor(private reservationService: ReservationService) {
    this.reservationData= {} as Reservation;
    this.dataSource = new MatTableDataSource<Reservation>();
    this.getAllReservations();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }
  getAllReservations(){
    this.reservationService.getAll().subscribe((response:any) =>{
      this.dataSource.data = response;
    })
  }
}
