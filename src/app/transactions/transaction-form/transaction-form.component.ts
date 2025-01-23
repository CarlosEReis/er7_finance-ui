import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../model/transaction.model';
import { TransactionsEventService } from '../transactions-event.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

  title!: string;
  date: Date | undefined;
  isEdit: boolean = false;
  formTrasaction!: FormGroup;
  dialogVisible: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private transactionsService: TransactionsService,
    private transactionEvent: TransactionsEventService
  ) { }

  ngOnInit(): void {
    this.dialogVisible = true;
    const id = this.route.snapshot.params['id']    
    if (id) {
      this.isEdit = true;
      this.title = 'Editando Transação ' + id ;
      this.loadingTransactionById(id)
    } else {
      this.title = 'Adicionar Transação'
    } 

    this.formTrasaction = this.getTransactionForm();
  }

  getTransactionForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      category: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      paymentMethod: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      date: [this.date, Validators.required],
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

  save(){
    if(this.isEdit) {
      this.OnUpdate();
    } else {
      this.onCreate();
    }
    this.router.navigate(['transactions'])
  }

  close() {
    this.formTrasaction.reset();
    this.router.navigate(['transactions'])
  }

  private onCreate() {
    this.transactionsService.createTransaction(this.formTrasaction.value).subscribe({
      next: transaction => {
        this.onSuccess('Transação atualizada com sucesso')
        this.transactionEvent.createEvent.next(transaction)
      },
      error: err => () => this.onError('Não foi possível criar a transaction')
    });
  }

  private OnUpdate() {
    const id = this.formTrasaction.get('id')?.value;
    this.transactionsService.updateTransaction(id,this.formTrasaction.value).subscribe({
      next: transaction => {
        this.onSuccess('Transação atualizada com sucesso')
        this.transactionEvent.updateEvent.next(transaction)
      },
      error: () => this.onError('Não foi possível atualizar a transaction: ' + id)
    });
  }
  
  private loadingTransactionById(id: number) {
    this.transactionsService.getTransactionById(id)
    .subscribe({
      next: (transaction: Transaction) => {
        this.formTrasaction.patchValue(transaction)
        this.date = new Date(transaction.date)
      },
      error: err => this.onError('Não foi possível carregar a transação de ID ' + id)
    })
  }

  private onSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message })
  }

  private onError(message: string): void{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message })
  }
}

