import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../model/transaction.model';
import { TransactionsEventService } from '../transactions-event.service';
import { TransactionType } from '../../model/transaction-type.enum';
import {PAYMENT_METHOD_OPTIONS, TRANSACTION_CATEGORY, TRANSACTION_TYPE_PAYMENT} from '../../model/ui.constants';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

  title!: string;
  isEdit: boolean = false;
  formTrasaction!: FormGroup;
  formGroup!: FormGroup;
  optionsGroup: any[] = [];
  dialogTransactionVisible: boolean = false;
  dialogGroupVisible: boolean = false;
  selectedTransactionType!: { name: string; color: 'success' | 'danger' | 'info' | 'secondary' | 'warning' | 'contrast' | undefined; icon: string };
  tipoDespesaOptions = TRANSACTION_TYPE_PAYMENT;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private transactionsService: TransactionsService,
    private transactionEvent: TransactionsEventService
  ) { }

  ngOnInit(): void {
    this.dialogTransactionVisible = true;
    const id = this.route.snapshot.params['id']
    if (id) {
      this.isEdit = true;
      this.title = 'Editando Transação ' + id ;
      this.loadingTransactionById(id)
    } else {
      this.title = 'Adicionar Transação'
    }
    this.formTrasaction = this.getTransactionForm();
    this.formGroup = this.getFormGroup();
    this.getGroups();
  }
  checked: boolean = false;

  getTransactionForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      totalAmount: [0],
      category: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      paymentMethod: this.formBuilder.group({
        id: ['', Validators.required],
      }),
      date: [null, Validators.required],
      group: this.formBuilder.group({
        id: [null, Validators.required]
      }),
      paymentType: ['UNICO', Validators.required],
      numberParcels: [0, Validators.required]
    });
  }

  getFormGroup(): FormGroup {
   return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getMetodosPagamento() {
    return PAYMENT_METHOD_OPTIONS.map(payment => ({ name: payment.label, code: payment.id })); }

  getTiposCategoria() {
    return TRANSACTION_CATEGORY.map(category => ({ name: category.label, code: category.id })); }

  getTiposTransacao() {
    return [
      { name: 'RECEITA', code: 'DEPOSIT', icon: 'pi pi-arrow-up-right', color: 'success' },
      { name: 'DESPESA', code: 'EXPENSE', icon: 'pi pi-arrow-down-right', color: 'danger' },
      { name: 'INVESTIMENTO', code: 'INVESTMENT', icon: 'pi pi-chart-line', color: 'info' },
    ];
  }

  getGroups() {
    this.transactionsService.getGroupsFromUser().subscribe({
      next: (groups) => {
        this.optionsGroup = groups.map((group: any) => {
          return { name: group.name, code: group.id };
        });
      },
      error: (error) => {
        console.error(error);
        this.onError('Não foi possível carregar os grupos do usuário')}
    })
  }

  updateTitle(type: TransactionType) {
    switch (type) {
      case TransactionType.DEPOSIT:
        this.title = 'Adicionando uma Receita';
        break;
      case TransactionType.EXPENSE:
        this.title = 'Adicionando uma Despesa';
        break;
      case TransactionType.INVESTMENT:
        this.title = 'Adicionando um Investimento';
        break;
    }
  }

  atualizarValorParcela() {
    const valorTotal = this.formTrasaction.get('totalAmount')?.value;
    const qtdeParcela = this.formTrasaction.get('numberParcels')?.value;
    var valorParcela = valorTotal / qtdeParcela;
    this.formTrasaction.get('amount')?.setValue(valorParcela);
    this.formTrasaction.get('numberParcels')?.setValue(qtdeParcela);
  }

  createGroup() {
    if(!this.formGroup.invalid) {
      const group = {
        name: this.formGroup.get('name')?.value,
        description: this.formGroup.get('description')?.value
      }
      this.transactionsService.createGroup(group).subscribe({
        next: (group) => {
          this.onSuccess('Grupo criado com sucesso')
          this.dialogGroupVisible = false;
          this.optionsGroup.push({ name: group.name, code: group.id });
          this.formTrasaction.get('group')?.get('id')?.setValue(group.id);
        },
        error: (error) => {
          console.error(error);
          this.onError('Não foi possível criar o grupo')}
      })
    }
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
      error: (error) => {
        console.error(error)
        this.onError('Não foi possível criar a transaction')}
    });
  }

  private OnUpdate() {
    const id = this.formTrasaction.get('id')?.value;
    this.transactionsService.updateTransaction(id,this.formTrasaction.value).subscribe({
      next: transaction => {
        this.onSuccess('Transação atualizada com sucesso')
        this.transactionEvent.updateEvent.next(transaction)
      },
      error: (error) => {
        console.error(error);
        this.onError('Não foi possível atualizar a transaction: ' + id)}
    });
  }

  private loadingTransactionById(id: number) {
    this.transactionsService.getTransactionById(id)
    .subscribe({
      next: (transaction: Transaction) => {
        this.formTrasaction.patchValue({
          ...transaction,
          date: transaction.date ? new Date(transaction.date) : null
        })
      },
      error: (error) => {
        console.error(error);
        this.onError('Não foi possível carregar a transação de ID ' + id)}
    })
  }

  private onSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message })
  }

  private onError(message: string): void{
    this.messageService.add({
      severity: 'error',
      summary: 'Erro no servidor remoto: ',
      detail: message.concat('. Tente novamente em instantes ou contate o Administrador do sistema.'),
      life: 50000,
      key: 'error',
      closable: true
    })
  }


}
