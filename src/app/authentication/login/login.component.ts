import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  
  e!: User;
  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router,) {
    this.email = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password,

    });
  }

  ngOnInit(): void {
  }
  login() {
    this.e = {
      name: '',
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
      otp: '',
    }
    this.authService.getToken(this.e).subscribe(
      (res: any) => {
        // console.log(res);
        // this.router.navigate(['/employeelist']);
        if (res.status==401) {
         alert(res.msg);
        }else{
          alert("Login successful!");
          this.authService.setDataInLocalStorage('userData', JSON.stringify(res.data));
          this.authService.setDataInLocalStorage('token', res.token);
          this.router.navigate(['/employeelist']);
        }
      });
  }


}
