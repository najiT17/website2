import { Component } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css',]
})
export class NavbarComponent {

  @Output() openAuth = new EventEmitter<'login' | 'signup'>();

}
