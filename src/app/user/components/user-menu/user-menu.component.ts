import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public userImage = 'assets/images/others/admin.jpg';
  constructor(
    public router:Router,
  ) { }

  ngOnInit(): void {
  }

  logOut(){
    console.log("in logout");
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
  

}
