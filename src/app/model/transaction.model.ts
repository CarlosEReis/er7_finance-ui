import { Category } from "./category.model";
import { PaymentMethod } from "./payment-method.model";
import { TransactionType } from "./transaction-type.enum";

export interface Transaction {
    id: number;
    type: TransactionType;
    name: string;
    amount: number;
    category: Category
    date: string;
    createdAt: string;
    updatedAt: string;
    paymentMethod: PaymentMethod;
    recurring: boolean;
}
