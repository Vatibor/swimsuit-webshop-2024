import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {CommonModule} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatNavList,
    MatIcon,
    MatListItem,
    MatToolbar,
    RouterLink,
    CommonModule,
    MatIconButton
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Input() loggedInUser?: firebase.default.User | null



  constructor() {
  }

  ngOnInit(): void {
  }

  close(logout?: boolean) {
    if (logout === true) {
      this.onLogout.emit(true)
    }
    this.onCloseSidenav.emit(true);
  }









}
