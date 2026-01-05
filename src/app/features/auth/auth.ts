import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [SharedModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private authService = inject(AuthService);
  private router = inject(Router);
  authForm;

  constructor(private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, this.passwordStrengthValidator]],
    });
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (!value) {
      return null;
    }
    const hasMinLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);

    if (hasMinLength && hasNumber && hasUpperCase && hasLowerCase) {
      return null;
    }
    return { weakPassword: true };
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const { email } = this.authForm.value;

    this.authService.login(email!);
    this.router.navigate(['/']);
  }
}
