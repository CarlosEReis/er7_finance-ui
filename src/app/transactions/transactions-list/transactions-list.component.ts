import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionsService } from '../transactions.service';
import { TransactionType } from '../../model/transaction-type.enum';
import { TransactionPaymentMethod } from '../../model/payment-method.enum';
import { PAYMENT_METHOD_OPTIONS, TRANSACTION_CATEGORY, TRANSACTION_TYPE_OPTION } from '../../model/ui.constants';
import { TransactionCategory } from '../../model/transaction-category.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TransactionsEventService } from '../transactions-event.service';


@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent implements OnInit {

  trasanctions!: Transaction[];

  constructor(
    private transactionsService: TransactionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: TransactionsEventService
  ) { }

  ngOnInit(): void {
    this.getTransactionService();
    this.eventService.createEvent.subscribe((data) => {
      this.getTransactionService();
    });
    this.eventService.updateEvent.subscribe((data) => {
      this.getTransactionService();
    });
  }

  private getTransactionService(): void {
    this.transactionsService.getTransactions().subscribe({
      next: (trasanctions) => {
        this.trasanctions = trasanctions
      },
      error: (err) => console.log(err),
    })
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
            this.transactionsService.getTransactions().subscribe({
              next: (trasanctions) => {
                this.trasanctions = trasanctions
              },
              error: (err) => console.log(err),
            })
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não foi possível remover a transação' })
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

  create(any: any) {
    console.log("EVENTO CRIACAO")
  }

  update(any: any) {
    console.log("EVENTO ATUALIZACAO")
  }
}
