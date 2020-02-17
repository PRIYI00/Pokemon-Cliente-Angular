import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor() { 
    console.debug('NavbarComponent Constructor');
  } // Constructor

  ngOnInit() {
    console.debug('NavbarComponent ngOnInit');
  } // ngOnInit

} // NavbarComponent
