import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css',]
})
export class NavbarComponent {

  @Output() openAuth = new EventEmitter<'login' | 'signup'>();
  
  constructor(public authService: AuthService) {}
}
