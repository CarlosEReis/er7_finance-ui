import { Component, Input, OnInit } from '@angular/core';
import { TransactionType } from '../../model/transaction-type.enum';
import { TRANSACTION_TYPE_OPTION } from '../../model/ui.constants';

interface TransactionTypeUI {
  label: string,
  icon: string,
  tagType: string,
  color: string
}

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css'
})
export class KpiCardComponent implements OnInit {

  @Input() transactionType!: TransactionType;
  @Input() valor = 0
  @Input() porcentagem = 0

  options!: TransactionTypeUI;
  id = ''

  ngOnInit(): void {

    this.options = TRANSACTION_TYPE_OPTION.find(op => op.value === this.transactionType) as TransactionTypeUI;

    switch (this.transactionType) {
      case TransactionType.INVESTMENT:
        this.id = 'investiment'
        break
      case TransactionType.DEPOSIT:
        this.id = 'deposit'
        break;
      case TransactionType.EXPENSE:
        this.id = 'expense'
        break
      default:
        break;
    }

  }


}
