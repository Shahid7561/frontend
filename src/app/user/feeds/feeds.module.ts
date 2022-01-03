import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeedsComponent } from './feeds.component';
import { ReactiveFormsModule } from '@angular/forms';
export const routes = [
  { path: '', component: FeedsComponent, pathMatch: 'full' }
]; 

@NgModule({
  declarations: [
    FeedsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
   
  ]
})
export class FeedsModule { }
