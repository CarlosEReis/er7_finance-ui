import { Component, OnInit } from '@angular/core';
import { DashboarService } from '../dashboar.service';
import { PAYMENT_METHOD_OPTIONS } from '../../model/ui.constants';
import { TransactionType } from '../../model/transaction-type.enum';
import { TransactionPaymentMethod } from '../../model/payment-method.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  TransactionType = TransactionType;
  transactionsByCaytegory!: any[];
  trasanctions!: any[];
  options: any;
  data: any;

  constructor(private dashboardService: DashboarService) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    this.getTransactionsCategory();
    this.getTransactions();

    this.options = {
      cutout: '60%'
    }
    this.data = {
      datasets: [
        {
          borderWidth: 0,
          data: [300, 50, 100],
          backgroundColor: [documentStyle.getPropertyValue('--primary-color'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--blue-500')],
          hoverBackgroundColor: ['#b0ea51e0', documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--blue-400')]
        }
      ]
    };

  }

  getTransactionsCategory() {
    this.dashboardService.porCategoria(6).subscribe({
      next: (trasanctions) => {
        this.transactionsByCaytegory = trasanctions
      },
      error: (err) => console.log(err),
    })
  }

  getTransactions() {
    this.dashboardService.getTransactions().subscribe({
      next: (transactions) => {
        this.trasanctions = transactions;
      },
      error: (err) => console.log(err),
    });
  }

  getIcons(paymentMethod: TransactionPaymentMethod): string {
    const transactionPaymentMethod = PAYMENT_METHOD_OPTIONS.find(method => method.value === paymentMethod);
    return transactionPaymentMethod ? transactionPaymentMethod.icon : '';
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
  
  getLabel(paymentMethod: TransactionPaymentMethod) {
    const option = PAYMENT_METHOD_OPTIONS.find(option => option.value === paymentMethod);
    return option ? option.label : 'Desconhecido';
  }

}
