import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsEventService {
  createEvent = new Subject<Transaction>();
  updateEvent = new Subject<Transaction>();
}
