import { Component } from '@angular/core';
import { GLOBAL } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  // Variable
  title : string;
  global : Array<any>;

  constructor() { 
    console.debug('constructor AppComponent');
	  this.title = 'Pokemon-Cliente-Angular';
	  this.global = GLOBAL;
  } // Constructor

  ngOnInit() {
    console.debug('ngOnInit AppComponent');
  } // ngOnInit
} // AppComponent
