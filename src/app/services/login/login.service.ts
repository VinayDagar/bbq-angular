import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  userLogin(user) {
    return this.http.post('http://localhost:3001/api/v1/login', user)
      .pipe(
        catchError(this.handleError)
      )
  }
  handleError(error) {
    console.log(error)
    return ('Something bad happened; please try again later.');
  }

}
