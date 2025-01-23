import { TransactionPaymentMethod } from "./payment-method.enum";
import { TransactionCategory } from "./transaction-category.enum";
import { TransactionType } from "./transaction-type.enum";

export const TRANSACTION_TYPE_OPTION = [
  {
    value: TransactionType.DEPOSIT,
    label: 'Depósito',
    icon: 'pi-arrow-up-right',
    tagType: 'p-tag-success text-primary',
    color: 'green'
  },
  {
    value: TransactionType.EXPENSE,
    label: 'Despesa',
    icon: 'pi-arrow-down-right',
    tagType: 'p-tag-danger',
    color: 'red'
  },
  {
    value: TransactionType.INVESTMENT,
    label: 'Investimento',
    icon: 'pi-chart-line',
    tagType: 'p-tag-info',
    color: 'blue'
  }
]

export const PAYMENT_METHOD_OPTIONS = [
  {
    value: TransactionPaymentMethod.CASH,
    label: 'Dinheiro',
    icon: 'pi-dollar'
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label: 'Cartão de Débito',
    icon: 'pi-credit-card'
  },
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label: 'Cartão de Credito',
    icon: 'pi-credit-card'
  },
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label: 'Transferência Bancária',
    icon: 'pi-arrow-right-arrow-left'
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: 'Outros',
    icon: ''
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: 'Pix',
    icon: 'pi-qrcode'
  },
  {
    value: TransactionPaymentMethod.CRIPTO,
    label: 'Cripto',
    icon: 'pi-bitcoin'
  },
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label: 'Boleto',
    icon: 'pi-barcode'
  }
];

export const TRANSACTION_CATEGORY = [
  {
    value: TransactionCategory.HOUSING,
    label: 'Moradia'
  },
  {
    value: TransactionCategory.TRANSPORTATION,
    label: 'Transporte'
  },
  {
    value: TransactionCategory.FOOD,
    label: 'Alimetação'
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: 'Entreterimento'
  },
  {
    value: TransactionCategory.HEALTH,
    label: 'Saúde'
  },
  {
    value: TransactionCategory.UTILITY,
    label: 'Utilidades'
  },
  {
    value: TransactionCategory.SALARY,
    label: 'Salário'
  },
  {
    value: TransactionCategory.EDUCATION,
    label: 'Educação'
  },
  {
    value: TransactionCategory.OTHER,
    label: 'Outros'
  }
]