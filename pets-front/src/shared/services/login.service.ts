import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-responce.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`,
      {email, password},
      this.getHeaders()
    ).pipe(
      map((resp) => {
        return resp;
      })
    )
  }

  register(
    email: string,
    name: string,
    password: string
  ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`,
      {email, password, name},
      this.getHeaders()
    ).pipe(
      map((resp) => {
        return resp;
      })
    )
  }


  private getHeaders(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

}
