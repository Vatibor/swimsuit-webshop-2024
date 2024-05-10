import {Component, Inject, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private _snackBar: MatSnackBar) {
  }

  authService = inject(AuthService)
  fb = inject(FormBuilder)
  router = inject(Router)


  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit() {
    const rawForm = this.form.getRawValue()
    this.authService
      .login(rawForm.email, rawForm.password)
      .then(_ => {
        this.router.navigateByUrl('/')
      }).catch(error => {
      this._snackBar.open(error.message, "X")
    })
  }
}
