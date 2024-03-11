import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  
  canActivate(){  
    if (this.authService.getToken1()) {
      return true;
    }
    else{
      window.alert("You are not authenticated!")
      this.router.navigate(['/login'])
      return false;
    }
    
  }
  
}
