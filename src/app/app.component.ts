import { Component, OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns:string[] = ['id', 'FirstName', 'LastName', 'Dob','Gender','Education','Company','Salary','action',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog:MatDialog, private _empService:EmployeeService){}
ngOnInit():void{
  this.getEmployList();
}
    mpForm(){

      const dialogRef=this._dialog.open(AddEditComponent);
      dialogRef.afterClosed().subscribe({
        next:(val) =>{
          if(val){
            this.getEmployList();
          }
        }
      })
      
    }
    getEmployList(){
      this. _empService.getEmployeeList().subscribe({
        next:(res)=>{
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
        },
        error:(err) =>{
        console.log(err);
        }
      })
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    deleteEmployee(id: number){
      this._empService.deleteEmployee(id).subscribe({
        next:(res) =>{
        alert('deleted successfully!');
        this.getEmployList();
        },
        error:console.log,
      })
    }
    openEditForm(data: any){

      this._dialog.open(AddEditComponent,{
      data: data
      });
       
    }
}


