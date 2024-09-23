import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(public fb: FormBuilder, private http: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required] 
    })
  }

  LoginUser(){
    if(this.loginForm.valid){
      this.http.loginUser(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/dashboard');
        }, error: (err) => {
          console.log(err)
        }, complete: () => {
          console.log("Token reciived successfully. And login done.")
        }
      })
    }
    console.log(this.loginForm.value);
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.loginForm.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
}
