import { Injectable } from '@angular/core';
import { TransactionType } from '../model/transaction-type.enum';
import { Transaction } from '../model/transaction.model';
import { first, Observable, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { TopCategory } from '../model/top-category.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly URL_API_BASE = environment.apiUrl;
  private readonly URL_API = environment.apiUrl.concat('v1/transactions')
  private readonly URL_API_CANCEL_PLAN = environment.apiUrl;

  constructor(private http: HttpClient ) { }

    getTransactions(): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(this.URL_API).pipe(first())
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

    getTransactionsByTopCategory(top: number): Observable<TopCategory[]> {
      return this.http.get<TopCategory[]>(`${this.URL_API}/statistics/total-per-category?top=${top}`).pipe(first())
    }

    getTransactionBalance() {
      return (this.http.get<any>(`${this.URL_API}/statistics/balance`)).pipe(first())
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

}
