import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionsService } from '../transactions.service';
import { TransactionType } from '../../model/transaction-type.enum';
import { TransactionPaymentMethod } from '../../model/payment-method.enum';
import { PAYMENT_METHOD_OPTIONS, TRANSACTION_CATEGORY, TRANSACTION_TYPE_OPTION } from '../../model/ui.constants';
import { TransactionCategory } from '../../model/transaction-category.enum';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent implements OnInit {

  trasanctions!: Transaction[];
  dialogVisible = false;

  constructor(
    private transactionsService: TransactionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTransactionService();
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
    this.dialogVisible = true;
  }

  editTransaction(id: number) {
    this.dialogVisible = true;
  }

  closedDialogNewTransaction(event: any) {
    this.dialogVisible = false;
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

  deleteTransaction() {

      this.confirmationService.confirm({
        header: 'Tem Certeza?',
        message: 'Tem certeza que deseja excluir esta transação de ID XXX, do tipo DEPÓSITO?',
        accept: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação removida com sucesso.', life: 3000 });
        },
        reject: () => {}
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
}
