import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import {delay, first, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { TopCategory } from '../model/top-category.model';
import {TransactionFilter} from './TransactionFilter';
import {FilterTransactions} from './transactions-list/filter-transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly URL_API_BASE = environment.apiUrl;
  private readonly URL_API = environment.apiUrl.concat('v1/transactions')
  private readonly URL_API_CANCEL_PLAN = environment.apiUrl;

  constructor(private http: HttpClient ) { }

    getTransactions(filter: TransactionFilter): Observable<Transaction[]> {
      const params = this.buildParams(filter);
      return this.http.get<Transaction[]>(this.URL_API, { params }).pipe(first())
    }

    getTransactionById(id: number): Observable<Transaction> {
      return this.http.get<Transaction>(`${this.URL_API}/${id}`).pipe(first())
    }

    createTransaction(transaction: Transaction) {
      return this.http.post<Transaction>(this.URL_API, transaction).pipe(first())
    }

    updateTransaction(id: number, transaction: Transaction) {
      return this.http.put<Transaction>(`${this.URL_API}/${id}`, transaction).pipe(first())
    }

    deleteTransaction(id: number) {
      return this.http.delete<Transaction>(`${this.URL_API}/${id}`).pipe(first())
    }

    getTransactionsByTopCategory(filter: TransactionFilter, top: number): Observable<TopCategory[]> {
      const params = this.buildParams(filter);
      return this.http.get<TopCategory[]>(`${this.URL_API}/statistics/total-per-category?top=${top}`, { params }).pipe(delay(500))
    }

    paymentCloser(id: number): Observable<void> {
      const statusPayment = 'PAGO';
      return this.http.put<void>(`${this.URL_API}/${id}/payment-close`, { statusPayment }).pipe(first());
    }

    paymentOpen(id: number): Observable<void>{
      const statusPayment = 'PAGAR';
      return this.http.put<void>(`${this.URL_API}/${id}/payment-open`, { statusPayment }).pipe(first());
    }

    getTransactionBalance(filter: TransactionFilter) {
      const params = this.buildParams(filter);
      return (this.http.get<any>(`${this.URL_API}/statistics/balance`, { params })).pipe(first())
    }

    cancelPlan() {
      return this.http.post<any>(`${this.URL_API_CANCEL_PLAN}cancel-plan`, {}).pipe(first())
    }

    getGroupsFromUser() {
      return this.http.get<any>(`${this.URL_API_BASE}v1/groups`).pipe(first())
    }

    createGroup(group: any) {
      return this.http.post<any>(`${this.URL_API_BASE}v1/groups`, group).pipe(first())
    }

    private buildParams(filter: TransactionFilter) : HttpParams {
      let params = new HttpParams();
      if (filter.dateProcessStar) params = params.append('dateProcessStar', filter.dateProcessStar.toISOString());
      if (filter.dateProcessEnd) params = params.append('dateProcessEnd', filter.dateProcessEnd.toISOString());
      if (filter.searchTitle) params = params.append('searchTitle', filter.searchTitle);
      if (filter.status) params = params.append('status', filter.status);
      return params;
    }

}
