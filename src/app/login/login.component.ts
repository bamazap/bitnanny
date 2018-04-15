import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: '';
  password: '';

  constructor(
    private auth: AuthService,
    private msg: MessageService,
    private router: Router,
   ) {}

  ngOnInit() {
  }

  login() {
    this.auth.login(this.username, this.password)
      .subscribe(
        success => {
          this.msg.clear();
          this.router.navigateByUrl('/records');
        },
        failure => this.msg.add('Login unsuccessful.'),
      ); // TODO: Redirect somewhere
  }

}
