import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service.service'
import { RegisterUser } from '../../interfaces/register-user';
import { Plan } from '../../interfaces/plans';
import { PlanService } from '../../services/plan/plan.service'

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
})

export class RegisterComponent {
  registerFormGroup: FormGroup;
  plans: Plan[] = [];
  submitted: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private planService: PlanService) {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']{2,50}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      plan: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.planService.getRoles().subscribe({
      next: (data) =>
        this.plans = data,
      error: () =>
        console.log("Plans not found")
    });
  }

  registerUser() {
    this.submitted = true;

    if (this.registerFormGroup.valid) {
      const registerUser: RegisterUser = this.registerFormGroup.value;
      this.authService.createUser(registerUser).subscribe({
        next: () => {
          alert("Usuário registrado");
          this.registerFormGroup.reset();
          this.submitted = false;
        },
        error: () =>
          alert("Erro ao registrar usuário")
      });
    }
    else {
      this.registerFormGroup.markAllAsTouched();
    }
  }
}

