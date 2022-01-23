import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { account } from "../../../environments/environment";
import { CommonService } from "../../theme/utils/common.service";

@Component({
  selector: 'app-find-profile',
  templateUrl: './find-profile.component.html',
  styleUrls: ['./find-profile.component.scss']
})
export class FindProfileComponent implements OnInit {

  constructor(private commonService: CommonService,
    private router: Router,
    public snackBar: MatSnackBar) {
      this.commonService.aClickedEvent
      .subscribe((data:string) => {
        this.getUserSearchResult(data)
        console.log('Event message from Component A: ' + data);
      });
     }
  searchString;
  searchData:any = []
  ngOnInit(): void {
  }
  getUserSearchResult(str) {
    let data = {name:str}
    this.commonService
    .post<any>(account.searchUser,data )
    .subscribe(
      async (res) => {
        console.log(res);
        this.searchData = res
        // this.getPostList();
      },err=>{
        this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
      })
  }
  viewProfile(id){
    console.log(id);
    this.router.navigate(['/search-page',id])
  }

}
