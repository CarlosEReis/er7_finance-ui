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
    id: 1,
    value: TransactionPaymentMethod.CREDIT_CARD,
    label: 'Cartão de Credito',
    icon: 'pi-credit-card'
  },
  {
    id: 2,
    value: TransactionPaymentMethod.DEBIT_CARD,
    label: 'Cartão de Débito',
    icon: 'pi-credit-card'
  },
  {
    id: 3,
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label: 'Transferência Bancária',
    icon: 'pi-arrow-right-arrow-left'
  },
  {
    id: 4,
    value: TransactionPaymentMethod.BANK_SLIP,
    label: 'Boleto',
    icon: 'pi-barcode'
  },
  {
    id: 5,
    value: TransactionPaymentMethod.CASH,
    label: 'Dinheiro',
    icon: 'pi-dollar'
  },
  {
    id: 6,
    value: TransactionPaymentMethod.PIX,
    label: 'Pix',
    icon: 'pi-qrcode'
  },
  {
    id: 7,
    value: TransactionPaymentMethod.OTHER,
    label: 'Outros',
    icon: ''
  },
  {
    id: 8,
    value: TransactionPaymentMethod.CRIPTO,
    label: 'Cripto',
    icon: 'pi-bitcoin'
  }
];

export const TRANSACTION_CATEGORY = [
  {
    id: 1,
    value: TransactionCategory.HOUSING,
    label: 'Moradia'
  },
  {
    id: 2,
    value: TransactionCategory.TRANSPORTATION,
    label: 'Transporte'
  },
  {
    id: 3,
    value: TransactionCategory.FOOD,
    label: 'Alimetação'
  },
  {
    id: 4,
    value: TransactionCategory.ENTERTAINMENT,
    label: 'Entreterimento'
  },
  {
    id: 5,
    value: TransactionCategory.HEALTH,
    label: 'Saúde'
  },
  {
    id: 6,
    value: TransactionCategory.UTILITY,
    label: 'Utilidades'
  },
  {
    id: 7,
    value: TransactionCategory.SALARY,
    label: 'Salário'
  },
  {
    id: 8,
    value: TransactionCategory.EDUCATION,
    label: 'Educação'
  },
  {
    id: 9,
    value: TransactionCategory.OTHER,
    label: 'Outros'
  }
]

export const TRANSACTION_TYPE_PAYMENT = [
  { label: 'Único', value: 'UNICO' },
  { label: 'Recorrente', value: 'RECORRENTE' },
  { label: 'Parcelado', value: 'PARCELADO' }
];
