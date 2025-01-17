import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

  date: Date | undefined;
  formTrasaction!: FormGroup;
  @Input() estado!: 'NEW' | 'EDIT';
  title!: string;
  @Input() dialogVisible: boolean = false;
  @Output() dialogState = new EventEmitter<boolean>();

  constructor(
    private transactionsService: TransactionsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formTrasaction = this.getTransactionForm();
  }

  transactionForm(state: string) {

  }

  getTransactionForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      type: [''],
      amount: [''],
      category: this.formBuilder.group({
        id: [''],
      }),
      paymentMethod: this.formBuilder.group({
        id: [''],
      }),
      date: [''],
    });
  }

  getMetodosPagamento() {
    return [
      { name: 'CREDIT_CARD', code: 1 }, 
      { name: 'DEBIT_CARD', code: 2 }, 
      { name: 'BANK_TRANSFER', code: 3 }, 
      { name: 'BANK_SLIP', code: 4 }, 
      { name: 'CASH', code: 5 }, 
      { name: 'PIX', code: 6 }, 
      { name: 'OTHER', code: 7 }, 
    ];
  }

  getTiposCategoria() {
    return [
      { name: 'HOUSING', code: 1},
      { name: 'TRANSPORTATION', code: 2},
      { name: 'FOOD', code: 3},
      { name: 'ENTERTAINMENT', code: 4},
      { name: 'HEALTH', code: 5},
      { name: 'UTILITY', code: 6},
      { name: 'SALARY', code: 7},
      { name: 'EDUCATION', code: 8},
      { name: 'OTHER', code: 9},
    ]
  }

  getTiposTransacao() {
    return [
      { name: 'RECEITA', code: 'DEPOSIT' },
      { name: 'DESPESA', code: 'EXPENSE' },
      { name: 'INVESTIMENTO', code: 'INVESTMENT' },
    ];
  }

  cadastrar(){
    this.transactionsService.createTransaction(this.formTrasaction.value);
  }

  closeDialog() {
    this.dialogState.emit(!this.dialogVisible);
  }
}
