import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  isSubmitted: boolean = false;
  registerForm: FormGroup;

  constructor(public fb: FormBuilder, private auth: AuthService){
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
      confirmPassword: ['']
    }, {validators: this.passwordMatchValidator
    })
  }
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')
    if(password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({passwordMismatch: true})
    else
      confirmPassword?.setErrors(null)
    return null;
  }

  RegisterUser(){
    this.isSubmitted = true;
    if(this.registerForm.valid){
      this.auth.createUser(this.registerForm.value).subscribe({
        next: res => {console.log(res)},
        error: err => {console.log(err)}
      })
      console.log(this.registerForm.value)
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.registerForm.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
}
