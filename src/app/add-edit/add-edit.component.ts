import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Observer } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit{
empForm:FormGroup;

education:string[]=[
 'BSc','BA','MSc','MA','Phd'
];
constructor(private _fb:FormBuilder,
  private _empService:EmployeeService, 
  private _dialogref:MatDialogRef<AddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any){
this.empForm=this._fb.group({
  FirstName:'',
  LastName:'',
  Dob:'',
  Gender:'',
  Education:'',
  Company:'',
  Salary:'',

})

}
ngOnInit(): void {
  this.empForm.patchValue(this.data);
}
onFormSubmit() {
  if (this.empForm.valid) {
if(this.data){
  this._empService.UpdateEmployee(this.data.id,this.empForm.value).subscribe({
    next: (val: any) => {
      console.log(val); // Use the val parameter as needed
      alert('Updated successfully');
      this._dialogref.close(true);
    },
    error: (err: any) => {
      console.error(err);
    }
  } as Observer<any>);

}else{this._empService.addEmployee(this.empForm.value).subscribe({
  next: (val: any) => {
    console.log(val); // Use the val parameter as needed
    alert('Employee added successfully');
    this._dialogref.close(true);
  },
  error: (err: any)=> {
    console.error(err);
  }
} as Observer<any>);
}

    
  }
}}