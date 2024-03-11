import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  email!: FormControl;

  e!: User;
  otp!: FormControl;
  resetform!: FormGroup;
  password!: FormControl;
  confirm_password!: FormControl;
  otp_sent: boolean = false;




  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router,) {
    this.email = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
    this.confirm_password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
    this.otp = new FormControl('', [Validators.required]);
    this.forgotPasswordForm = this.fb.group({
      email: this.email,
    });
    this.resetform = this.fb.group({
      email: this.email,
      password: this.password,
      confirm_password:this.confirm_password,
      otp: this.otp
    });
  }
  forgot_password() {
    this.e = {
      name: '',
      email: this.forgotPasswordForm.controls['email'].value,
      password: '',
      otp: '',
    }


    this.authService.forgotPassword(this.e).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 200) {
          this.otp_sent = true;
          this.router.navigate(['/forgotpassword']);
        } else {
          alert(res.msg);

        }
      });
  }

  reset_password() {
    let pass=this.resetform.controls['password'].value;
    let confirm_pass=this.resetform.controls['confirm_password'].value;
    console.log(this.password , this.confirm_password);
    if (pass === confirm_pass) {
      this.e = {
        name: '',
        email: this.resetform.controls['email'].value,
        password: this.resetform.controls['password'].value,
        otp: this.resetform.controls['otp'].value
        
      }
      this.authService.resetPassword(this.e).subscribe(
        (res: any) => {
          if (res.status === 200) {
            alert("Password reset successfull!")
            this.router.navigate(['/login'])
          } else {
            alert(res.msg);
          }
        });
    } else {
      alert("Password confirmation doesn't match!")
    }
  }
  ngOnInit(): void {
  }

}
