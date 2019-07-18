import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user:any = {};
  constructor(private login: LoginService, public router: Router) {}

  _login() {
    const data = {
      userName: this.user.username.trim(),
      password:this.user.password
    }
    this.login.userLogin(data)
      .subscribe((logedinUser:any) => {
        localStorage.setItem('x-access-token', logedinUser.object.token)
        localStorage.setItem('user', JSON.stringify(logedinUser.object.user));
        console.log(logedinUser)
        this.router.navigate(['/dashboard']);
      })
  }

}
