import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PAYMENT_METHOD_OPTIONS, TRANSACTION_CATEGORY } from '../../model/ui.constants';
import { TransactionType } from '../../model/transaction-type.enum';
import { TransactionPaymentMethod } from '../../model/payment-method.enum';
import { TransactionsService } from '../../transactions/transactions.service';
import { Transaction } from '../../model/transaction.model';
import { MOCKS_TRANSACTION_CATEGORY, MOCKS_TRANSACTIONS } from '../../model/mocks-data.model';
import { TransactionCategory } from '../../model/transaction-category.enum';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  hasData = false;
  balance = { deposit: 0, expense: 0, investment: 0, balance: 0 };
  TransactionType = TransactionType;
  transactionsByCaytegory!: any[];
  trasanctions!: any[];
  options: any;
  data: any;
  dataDoughnut:any[] = [0, 0, 0];

  @ViewChild('chart') chart: any;

  constructor(
    private transactionService: TransactionsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.messageService.clear('dashboard');
    const documentStyle = getComputedStyle(document.documentElement);

    this.getBalance();
    this.getTransactions();
    this.getTransactionsCategory();

    this.options = {
      cutout: '60%',
    }
    this.data = {
      datasets: [
        {
          borderWidth: 5,
          hoverOffset: 10,
          data: this.dataDoughnut,
          backgroundColor: ['rgba(55, 68, 37, 1)', 'rgba(239, 68, 68, 0.16)', 'rgba(59, 130, 246, 0.16)'],
          borderColor: [documentStyle.getPropertyValue('--primary-color'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--blue-500')],
          hoverBackgroundColor: [
            '#a3e63580',
            '#ef444480',
            '#3b82f680'],
        }
      ]
    };
  }

  getTransactionsCategory() {
    this.transactionService.getTransactionsByTopCategory(5).subscribe({
      next: (trasanctions) => {
        if (trasanctions.length === 0) {
          this.transactionsByCaytegory = MOCKS_TRANSACTION_CATEGORY;
          return;
        }
        this.transactionsByCaytegory = trasanctions
      },
      error: (err) => {
        console.error(err)
        this.onError('Não foi possível carregar as categorias')
      },
    })
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        
        if (transactions.length === 0) {
          this.trasanctions = MOCKS_TRANSACTIONS;
          this.setDadaDoughnut(transactions);
          this.data.datasets[0].data = [...this.dataDoughnut];
          this.hasData = false
          // atualiza o gráfico
          if (this.chart && this.chart.chart) this.chart.chart.update();
          return
        }
        this.hasData = true;
        this.trasanctions = transactions;
        this.setDadaDoughnut(transactions);
        this.data.datasets[0].data = [...this.dataDoughnut];
        
        // atualiza o gráfico
        if (this.chart && this.chart.chart) this.chart.chart.update();
        
      },
      error: (err) => {
        console.error(err)
        this.onError('Não foi possível carregar as transações')},
    });
  }

  private transactionsVerify() {
    this.trasanctions.length === 0 ? this.hasData = false : this.hasData = true;
  }

  private setDadaDoughnut(transactions: Transaction[]) {
    if (transactions.length === 0) {
      this.dataDoughnut = [33, 33, 33];
      return;
      
    }
    this.dataDoughnut = [
      transactions.filter(t => t.type === TransactionType.DEPOSIT).reduce((sum, t) => sum + t.amount, 0),
      transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0),
      transactions.filter(t => t.type === TransactionType.INVESTMENT).reduce((sum, t) => sum + t.amount, 0)
    ];
  }

  getBalance() {
    this.transactionService.getTransactionBalance().subscribe({
      next: (balace) => {
        this.balance = balace
      },
      error: (err) => {
        console.error(err),
        this.onError('Não foi possível carregar o balanço')}
    })
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
  
  getIcons(paymentMethod: TransactionPaymentMethod): string {
    const transactionPaymentMethod = PAYMENT_METHOD_OPTIONS.find(method => method.value === paymentMethod);
    return transactionPaymentMethod ? transactionPaymentMethod.icon : '';
  }

  getLabel(paymentMethod: TransactionPaymentMethod) {
    const option = PAYMENT_METHOD_OPTIONS.find(option => option.value === paymentMethod);
    return option ? option.label : 'Desconhecido';
  }

  getTransactionCategoryLabel(categoryId: TransactionCategory): string {
    const category = TRANSACTION_CATEGORY.find(category => category.value === categoryId);
    return category ? category.label : 'Desconhecido';
  }

  newTransaction() {
    this.router.navigate(['transactions/new']);
  }

  private onSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message })
  }

  private onError(message: string): void{
    this.messageService.add({ 
      severity: 'error', 
      summary: 'Erro no servidor remoto: ', 
      detail: message.concat('. Tente novamente em instantes ou contate o Administrado do sistema.'), 
      life: 50000, 
      key: 'error'
    })
  }

}
