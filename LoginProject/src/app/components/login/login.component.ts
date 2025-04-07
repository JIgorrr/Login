import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service.service';
import { LoginUser } from '../../interfaces/login-user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formGroupLogin: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.formGroupLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginUser(){
    this.submitted = true;

    if(this.formGroupLogin.valid){
      const user: LoginUser = this.formGroupLogin.value as LoginUser;

      this.authService.verifyUser(user).subscribe({
        next: () => {
          this.router.navigate(['/home']);
          this.formGroupLogin.reset();
        },
        error: () => 
          alert("Usuario invalido")
      });

    }
    else{
      this.formGroupLogin.markAllAsTouched();
    }
  }
}
