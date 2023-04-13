import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-responce.interface';
import { SessionStorageService } from './session-storage.service';
import { KEYS } from '../models/keys.const';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
  ) {
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`,
      {email, password},
      this.getHeaders()
    ).pipe(
      map((resp) => {
        this.sessionStorage.setItem(KEYS.ACCESS_TOKEN, resp.accessToken);
        this.sessionStorage.setItem(KEYS.REFRESH_TOKEN, resp.refreshToken);
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

  getTMPUsers(){
    return this.http.get(`${this.baseUrl}/users`);
  }

  private getHeaders(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

}
