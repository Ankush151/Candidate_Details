import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  {path:'',component:AppComponent},
  {path:'studentslists',component: AppComponent},
  {path:'studentdetails',component:DialogComponent},
  {path:'studentdetails/:_id',component:DialogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
