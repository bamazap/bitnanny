import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navLinks = [
    {path: '/records', label: 'Records'},
    {path: '/analytics', label: 'Analytics'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
