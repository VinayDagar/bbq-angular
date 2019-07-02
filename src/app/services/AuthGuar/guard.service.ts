import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(public router: Router) {}

  public canActivate():boolean {
    const token = localStorage.getItem('x-access-token');
    console.log(token)
    if(!token) {
      this.router.navigate(['login']);
      return false
    }
    return true
  }
}
