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
    console.trace('constructor AppComponent');
	  this.title = 'Pokemon-Cliente-Angular';
	  this.global = GLOBAL;
  } // Constructor

  ngOnInit() {
    console.trace('ngOnInit FiltrosComponent');
  } // ngOnInit
} // AppComponent
