import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {  OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComponentService } from './service/component.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'student-detail-form';
  displayedColumns=['serialNumber','name','roll','subject','practical','theory','total','grade','edit','delete']
  dataSource = new  MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | undefined;    
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private dialog: MatDialog,
    private location:Location,
    private router:Router,
    private snackBar:MatSnackBar, 
    private studentService:ComponentService ,
    

    ){

  }
  ngOnInit(): void {
    this.studentService.findAll().subscribe(
      response=>{
        this.dataSource.data = response;
        this.dataSource._updateChangeSubscription()
      },
      error=>{
        this.showError('Error reading Students Details')        
      }
    )
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%',
    
      
    });
  }

  
  
  editButtonClicked(studentsDetailsData:any){
    this.router.navigate([`${studentsDetailsData._id}`]);
    this.dialog.open(DialogComponent, {
      width:'30%',
     
    });
      
  }
  //  deleteButtonClicked(studentsDetailsData:any){
  //   // const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
  //   //   width:'400px',data:{message:`Are you sure that you want to delete the Standard Verbiage ${studentsDetailsData.studentName} ?`}
  //   // });
  //   // deleteDialog.afterClosed().subscribe(result=>{
  //   //   if(result.event=='confirmed'){
  //   //     this.deleteStudentDetails(studentsDetailsData);   
  //   //   }
  //   // })    
  // }
  deleteStudentDetails(studentsDetailsData:any){
    this.studentService.delete(studentsDetailsData._id).subscribe(
      response => {
        this.showMessage('Student Details Deleted');
        this.studentService.findAll().subscribe(
          responseData => {
            this.dataSource.data = responseData;
            // Optionally, you can also trigger the change detection manually
            this.dataSource._updateChangeSubscription();
          },
          error => {
            this.showError('Error reading Students Details');
          }
        );
      },
      error => {
        this.showError('Error Deleting Student Details');
      }
    );   
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
  showMessage(msg: string){
    this.snackBar.open(msg,'Message',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }





}
