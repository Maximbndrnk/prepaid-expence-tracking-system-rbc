import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-responce.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
      `${this.baseUrl}/auth/refreshToken`
    ).pipe(
      map((resp) => {
        console.log('UPD To', resp);
        return resp;
      })
    )
  }
}
