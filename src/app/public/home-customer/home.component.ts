import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Reservation} from "../../reservations/model/reservation";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../reservations/service/reservation.service";

@Component({
  selector: 'app-home-customer',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  reservationData: Reservation;
  dataSource: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['id','customerId','sportFieldId','sportFieldType','date','hour','payment'];
  @ViewChild(MatPaginator)paginator:MatPaginator;
  @ViewChild(MatSort)sort:MatSort;
  constructor(private router: Router,private reservationService: ReservationService) {
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
  ToLogin() {
    this.router.navigate(['auth']);
  }
}
