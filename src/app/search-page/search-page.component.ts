import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../theme/utils/common.service';
import { account } from '../../environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,) { }
userData
  ngOnInit(): void {
  let usrId =  this.route.snapshot.paramMap.get('id')
  console.log(usrId);
  this.commonService.get<any>(account.getUserById + usrId).subscribe(
    async (res) => {
      console.log(res);
      this.userData = res
    },err=>{
      console.log(err);
      
    })
  }

}
