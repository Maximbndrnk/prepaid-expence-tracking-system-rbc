import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/login-responce.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { KEYS } from '../models/keys.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
  ) {
  }

  public updateToken(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/auth/refreshToken`,
      {
        headers: new HttpHeaders({
          [KEYS.REFRESH_TOKEN]: this.sessionStorage.getItem(KEYS.REFRESH_TOKEN),
        }),
      }
    ).pipe(
      map((resp) => {
        this.sessionStorage.setItem(KEYS.ACCESS_TOKEN, resp.accessToken);
        this.sessionStorage.setItem(KEYS.REFRESH_TOKEN, resp.refreshToken);
        return resp;
      })
    )
  }
}
