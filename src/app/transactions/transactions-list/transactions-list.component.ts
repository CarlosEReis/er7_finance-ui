import {Component, OnInit} from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionsService } from '../transactions.service';
import { TransactionType } from '../../model/transaction-type.enum';
import { TransactionPaymentMethod } from '../../model/payment-method.enum';
import { PAYMENT_METHOD_OPTIONS, TRANSACTION_CATEGORY, TRANSACTION_TYPE_OPTION } from '../../model/ui.constants';
import { TransactionCategory } from '../../model/transaction-category.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsEventService } from '../transactions-event.service';
import {FormControl, FormGroup} from '@angular/forms';
import {TransactionFilter} from '../TransactionFilter';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent implements OnInit {

  public filterForm = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    searchTitle: new FormControl<string>(''),
    status: new FormControl<string>('TODOS')
  });

  loadingTransactions = true;
  transactions: Transaction[] | any[] = Array.from({ length: 13 }).map((_, i) => `Item #${i}`);

  constructor(
    private transactionsService: TransactionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: TransactionsEventService
  ) { }

  ngOnInit(): void {
    this.initFormFilter();
    this.messageService.clear('dahsboard');
    this.getTransactionService();
    this.eventService.createEvent.subscribe((data) => {
      this.getTransactionService();
    });
    this.eventService.updateEvent.subscribe((data) => {
      this.getTransactionService();
    });
  }

  private getTransactionService(): void {
    this.loadingTransactions = true;
    this.transactionsService.getTransactions(this.buildFilterFromForm()).subscribe({
      next: (trasanctions) => {
          this.loadingTransactions = false
          this.transactions = trasanctions
        },
        error: (error) => {
          this.loadingTransactions = false
          console.log(error)
          this.onError('Não foi possível carregar as transações.')},
    })
  }

  applyFilters(): void {
    this.getTransactionService();
  }

  newTransaction() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  editTransaction(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }

  closedDialogNewTransaction(event: any) {
    this.router.navigate(['/'], { relativeTo: this.route })
  }

  getIcon(paymentMethod: TransactionPaymentMethod): string | undefined {
    return PAYMENT_METHOD_OPTIONS.find(method => method.value === paymentMethod)?.icon;
  }

  getLabelPaymentMethod(paymentMethod: TransactionPaymentMethod): string | undefined {
    return PAYMENT_METHOD_OPTIONS.find(option => option.value === paymentMethod)?.label;
  }

  getLabelTransactioinCategory(category: TransactionCategory): string | undefined {
    return TRANSACTION_CATEGORY.find(cat => cat.value == category)?.label;
  }

  getLabelTransactionType(transactionType: TransactionType): string | undefined {
    return TRANSACTION_TYPE_OPTION.find(type => type.value == transactionType)?.label.toLocaleUpperCase();
  }

  deleteTransaction(transaction: Transaction) {
    this.confirmationService.confirm({
      header: 'Tem Certeza?',
      message: `Tem certeza que deseja excluir esta transação de ID ${transaction.id}, do tipo ${this.getLabelTransactionType(transaction.type)?.toUpperCase()}?`,
      accept: () => {
        this.transactionsService.deleteTransaction(transaction.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação removida com sucesso.', life: 3000 })
            this.transactionsService.getTransactions(this.buildFilterFromForm()).subscribe({
              next: (trasanctions) => {
                this.transactions = trasanctions
              },
              error: (error) => {
                console.log(error)
                this.onError('Não foi possível carregar as transações.')},
            })
          },
          error: (error) => {
            console.error(error)
            this.onError('Não foi possível excluir a transação de ID ' + transaction.id)
          }
        })

      },
      reject: () => { }
    });

  }

  getTipo(status: string) {
    switch (status) {
      case 'DEPOSIT':
        return 'success';
      case 'INVESTMENT':
        return 'info';
      case 'EXPENSE':
        return 'danger';
      default:
        return 'info';
    }
  }

  getStyleClass(type: TransactionType): string {
    switch (type) {
      case TransactionType.DEPOSIT:
        return 'p-tag-success text-primary';
      case TransactionType.INVESTMENT:
        return 'p-tag-info text-blue-500';
      case TransactionType.EXPENSE:
        return 'p-tag-danger text-red-500';
      default:
        return 'info';
    }
  }

  updateStatusPayment(id: number, status: 'A PAGAR' | 'PAGO') {
    if (status === 'A PAGAR')
      this.paymentOpen(id);
    else if (status === 'PAGO')
      this.paymentCloser(id);
  }

  private onSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message })
  }

  private onError(message: string): void{
    this.messageService.clear('error');
    this.messageService.add({
      severity: 'error',
      summary: 'Erro no servidor remoto: ',
      detail: message.concat('. Tente novamente em instantes ou contate o Administrado do sistema.'),
      life: 50000,
      key: 'error'
    })
  }

  private buildFilterFromForm(): TransactionFilter {
    const status = this.filterForm.get('status')?.value

    return {
      dateProcessStar: this.filterForm.get('startDate')?.value,
      dateProcessEnd: this.filterForm.get('endDate')?.value,
      searchTitle: this.filterForm.get('searchTitle')?.value || undefined,
      status: status && status !== 'TODOS' ? status : undefined
    };
  }

  private paymentCloser(id: number) {
    this.transactionsService.paymentCloser(id).subscribe({
       next: value => this.messageService.add(
         { severity: 'success', summary: 'Sucesso', detail: 'Pagamento alterado para \'PAGO\'.', life: 3000 }),
       error: error => this.messageService.add(
         { severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar o status do pagamento para \'PAGO\'.', life: 3000 })
    })
  }

  private paymentOpen(id: number) {
    this.transactionsService.paymentOpen(id).subscribe({
      next: value => this.messageService.add(
        { severity: 'success', summary: 'Sucesso', detail: 'Pagamento alterado para \'A Pagar\'.', life: 3000 }),
      error: error => this.messageService.add(
        { severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar o status do pagamento para \'A Pagar\'.', life: 3000 })
    });
  }

  private initFormFilter() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    this.filterForm.patchValue({
      startDate: firstDay,
      endDate: lastDay,
      searchTitle: '',
      status: 'TODOS'
    })
  }


}
