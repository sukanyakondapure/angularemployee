import { Injectable ,Injector} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authService = this.injector.get(AuthService)
    console.log("TOKEN --> ",authService.getToken1())
    let tokanizedReq= req.clone({
      setHeaders:{
        Authorization:`Bearer ${authService.getToken1()}`
      }
    })
    return next.handle(tokanizedReq);
  }
}
