import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  token = localStorage.getItem('x-access-token');

  constructor(private http:HttpClient) { }
  getSiteSurvey() {
    return this.http.get('http://localhost:3000/api/v1/site-survey', {
      headers:{
        'x-access-token': this.token 
      }
    })
  }
}
