import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { ITransactionFilterData, Transaction } from '../models/transactions.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
  ) {
  }

  getTransactions(
    ftd: ITransactionFilterData
  ): Observable<Transaction[]> {
    return this.http.get<any>(`${this.baseUrl}/transactions`).pipe(
      map((resp) => {
        return resp;
      })
    )
  }

  addTransaction(
    t: Transaction
  ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transactions`,
      { t },
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
