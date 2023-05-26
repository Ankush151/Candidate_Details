import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ComponentService } from '../service/component.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  _id:any='';

  studentDetailsForm = this.builder.group({
    name:this.builder.control('',Validators.required),
    roll:this.builder.control('',Validators.required),
    subject:this.builder.control('',Validators.required),
    theory:this.builder.control('',Validators.required),
    practical:this.builder.control('',Validators.required),
    total:this.builder.control('',Validators.required),
    grade:this.builder.control('',Validators.required),


  });
    constructor(private formBuilder: FormBuilder,
      private builder: FormBuilder,
      private studentService:ComponentService,
      private location:Location,
      private snackBar: MatSnackBar,
      private router:Router,
      private activatedRoute:ActivatedRoute,
      ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('_id')){
      this._id = this.activatedRoute.snapshot.paramMap.get('_id')
      this.studentService.findOne(this._id).subscribe(
          response =>{
            this.studentDetailsForm.get('name')?.setValue(response.name);
            this.studentDetailsForm.get('roll')?.setValue(response.roll);
            this.studentDetailsForm.get('subject')?.setValue(response.subject);
            this.studentDetailsForm.get('theory')?.setValue(response.theory);
            this.studentDetailsForm.get('practical')?.setValue(response.practical);
            this.studentDetailsForm.get('total')?.setValue(response.total);
            this.studentDetailsForm.get('grade')?.setValue(response.grade);

          },
          error=>{
            console.log(error);
          }
      )
    }
  }
  saveButton(){
    if(this._id==""){
      this.studentService.create(this.studentDetailsForm.getRawValue()).subscribe(
        response =>{
          this.showMessage('Students Details Saved')
          this.router.navigate(['']);
        },
        error=>{
          this.showError('Error Saving Details')
        }
      )

    }else{
      this.studentService.findOneAndUpdate(this._id,this.studentDetailsForm.getRawValue()).subscribe(
        response =>{
          this.showMessage('Students Details Saved')
          this.router.navigate(['studentslists']);
        },
        error=>{
          this.showError('Error Saving Students Details')
        }
      )
    }
    
  }
  // backButtonClicked(){
  //   this.router.navigate(['studentdetails']);
  // }
  // addButtonClicked(){
  //   this.router.navigate(['studentdetails']);
  // }
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
  showMessage(msg: string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }

}
