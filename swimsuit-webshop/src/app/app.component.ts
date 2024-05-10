import {Component, EventEmitter, inject, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from "./shared/menu/menu.component";
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from "@angular/material/toolbar";
import {ProductsComponent} from "./pages/products/products.component";
import {AuthService} from "./shared/services/auth.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {UserService} from "./shared/services/users.service";
import {UserInterface} from "./shared/models/user.interface";
import {FormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, MatSidenavModule, MatToolbar, ProductsComponent, RouterLink, MatIcon, MatIconButton, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {ngSkipHydration: 'true'}
})
export class AppComponent implements OnInit {
  loggedInUser?: firebase.default.User | null
  user?: UserInterface

  @Output() sexObjectEmitter: EventEmitter<any> = new EventEmitter();
  title = 'swimsuit-webshop';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ){
  }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe({
      next: (user => {
        this.loggedInUser = user
        localStorage.setItem('user', JSON.stringify(this.loggedInUser))
      }),
      error: (_ => {
        localStorage.setItem('user', JSON.stringify('null'))
      })
    })

    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user?.uid).subscribe(data => {
      this.user = data;
    }, error => {
      this._snackBar.open(error.message, "X")
    })
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      this._snackBar.open("Logged out.", "X")

    }).catch(error => {
      this._snackBar.open(error.message, "X")
    })
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }


}
