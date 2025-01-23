import { Injectable } from '@angular/core';
import { TransactionType } from '../model/transaction-type.enum';
import { Transaction } from '../model/transaction.model';
import { first, Observable, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly URL_API = environment.apiUrl.concat('v1/transactions')

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
}
