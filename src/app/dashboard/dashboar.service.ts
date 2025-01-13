import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../model/transaction.model';
import { TransactionType } from '../model/transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DashboarService {

  constructor() { }

  listar(): Observable<Transaction[]> {
    return of([
      {
        id: 44,
        type: TransactionType.DEPOSIT,
        name: 'Mesada',
        amount: 2000.0,
        category: {
          id: 6,
          name: 'UTILITY',
        },
        date: '2024-12-07T03:00:00Z',
        createdAt: '2024-12-07T13:20:23.027822Z',
        updatedAt: '2024-12-07T13:20:23.027854Z',
        paymentMethod: {
          id: 3,
          name: 'BANK_TRANSFER',
        },
        userId: 'google-oauth2|107023432690562050443',
      },
      {
        id: 43,
        type: TransactionType.DEPOSIT,
        name: 'Salário',
        amount: 3500.0,
        category: {
          id: 7,
          name: 'SALARY',
        },
        date: '2024-12-07T03:00:00Z',
        createdAt: '2024-12-07T13:18:56.65274Z',
        updatedAt: '2024-12-07T13:18:56.652818Z',
        paymentMethod: {
          id: 3,
          name: 'BANK_TRANSFER',
        },
        userId: 'google-oauth2|107023432690562050443',
      },
      {
        id: 42,
        type: TransactionType.DEPOSIT,
        name: 'Conta de Luz',
        amount: 150.75,
        category: {
          id: 3,
          name: 'FOOD',
        },
        date: '2024-12-03T03:00:00Z',
        createdAt: '2024-12-04T22:13:12.802589Z',
        updatedAt: '2024-12-04T22:13:12.802615Z',
        paymentMethod: {
          id: 1,
          name: 'CREDIT_CARD',
        },
        userId: 'google-oauth2|107023432690562050443',
      },
      {
        id: 41,
        type: TransactionType.EXPENSE,
        name: 'teste',
        amount: 25.0,
        category: {
          id: 3,
          name: 'FOOD',
        },
        date: '2024-12-04T03:00:00Z',
        createdAt: '2024-12-04T22:12:30.62056Z',
        updatedAt: '2024-12-04T22:12:30.620576Z',
        paymentMethod: {
          id: 2,
          name: 'DEBIT_CARD',
        },
        userId: 'google-oauth2|107023432690562050443',
      },
      {
        id: 40,
        type: TransactionType.DEPOSIT,
        name: 'Teste',
        amount: 25.0,
        category: {
          id: 3,
          name: 'FOOD',
        },
        date: '2024-12-04T03:00:00Z',
        createdAt: '2024-12-04T22:11:57.403688Z',
        updatedAt: '2024-12-04T22:11:57.40374Z',
        paymentMethod: {
          id: 3,
          name: 'BANK_TRANSFER',
        },
        userId: 'google-oauth2|107023432690562050443',
      },
    ]);
  }

  porCategoria(top: number) {
    return of([
      {
          "category": "SALARY",
          "total": 4476.92,
          "percent": 37.33
      },
      {
          "category": "UTILITY",
          "total": 2812.51,
          "percent": 23.45
      },
      {
          "category": "FOOD",
          "total": 1941.32,
          "percent": 16.19
      },
      {
          "category": "HOUSING",
          "total": 1271.38,
          "percent": 10.60
      },
      {
          "category": "HEALTH",
          "total": 998.19,
          "percent": 8.32
      },
      {
          "category": "OTHER",
          "total": 493.61,
          "percent": 4.12
      }
  ])
  }


}
