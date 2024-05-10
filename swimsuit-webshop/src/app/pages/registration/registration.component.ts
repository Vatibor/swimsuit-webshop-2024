import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { UserInterface } from "../../shared/models/user.interface";
import {UserService} from "../../shared/services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(private _snackBar: MatSnackBar) {
  }

  authService = inject(AuthService)
  userService = inject(UserService)
  fb = inject(FormBuilder)
  router = inject(Router)

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],

  })


  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService
      .register(rawForm.email, rawForm.password)
      .then(cred => {
        const user: UserInterface = {
          id: cred.user?.uid as string,
          email: rawForm.email,
          username: rawForm.username,
        }

        this.userService.create(user).then(_ => {
          this.router.navigateByUrl('/products')
          this._snackBar.open("User added successfully.", "X")

        }).catch(error => this._snackBar.open(error.message, "X"))
      }).catch(error => this._snackBar.open(error.message, "X"))
    }



}
