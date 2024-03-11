import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  data:any;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {

  }
  
  logout() {
    let confirm=window.confirm("Are you sure you want to log out?");
    if(confirm==true){
      localStorage.clear();  
      alert("Logout successful!");
      this.router.navigate(['/login']);
    }
   
  }
 
  loggedIn(){
    this.data= localStorage.getItem('userData');  
    return this.data;
  }
}




















 // isUserLogin() {
   
  //   let val=localStorage.getItem('userData');
  //   console.log(localStorage.getItem('userData'))
  //   if (val != null) {      
  //     this.isLogin = true;
     
  //   }
  // }