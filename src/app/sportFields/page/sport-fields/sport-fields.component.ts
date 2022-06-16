import {Component, OnInit, ViewChild} from '@angular/core';
import {SportField} from "../../model/sportField";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {SportFieldsService} from "../../service/sport-fields.service";
import {MatDialog} from "@angular/material/dialog";
import {ReservationComponent} from "../../../reservations/page/reservation/reservation.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sport-fields',
  templateUrl: './sport-fields.component.html',
  styleUrls: ['./sport-fields.component.css']
})
export class SportFieldsComponent implements OnInit {
  public colSize=3;
  public isMobile: boolean=false;

  sportFieldData!: SportField;
  dataSource!: MatTableDataSource<any>;
  sportsFields: Array<SportField>=[];
  @ViewChild('sportFieldForm', {static: false})
  sportFieldForm!:NgForm;
  constructor(private router: Router,private dialog: MatDialog,public sportsFieldsService: SportFieldsService, breakPointObserver: BreakpointObserver) {
    breakPointObserver.observe(
      [
        Breakpoints.Handset]).subscribe(result => {
      this.isMobile=result.matches;
      if(this.isMobile)
        this.colSize=1;
      else{
        this.colSize=3;
      }
    });
  }
  ngOnInit(): void {
    this.getAllSportsFields();
    this.sportFieldData={} as SportField;
    this.dataSource=new MatTableDataSource<any>();
  }
  getAllSportsFields(){
    this.sportsFieldsService.getAll().subscribe((response:any)=>{
      this.sportsFields=response;
    })
  }
  openDialog(){
    const dialogRef=this.dialog.open(ReservationComponent, {
      width:"30%",
      data: 'Are u sure the deletion of this data?'
    })
    dialogRef.afterClosed();
  }
  closeDialog():void{
    this.dialog.closeAll()
  }

  openProfile() {
    this.router.navigate(['ownerProfile']);
  }
}
