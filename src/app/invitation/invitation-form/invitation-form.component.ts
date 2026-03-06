import { Component, inject } from '@angular/core';
import { InvitatioinService } from '../invitatioin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TransactionsService } from '../../transactions/transactions.service';

export interface Invitation {
  email: string;
  groupId: number;
}

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrl: './invitation-form.component.css'
})
export class InvitationFormComponent {

    messageService = inject(MessageService)
    formBuilder: FormBuilder = inject(FormBuilder);
    invitationService = inject(InvitatioinService);
    transactionsService = inject(TransactionsService);
    formGroup!: FormGroup;
    
    optionsGroup: any[] = [];
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    constructor() {

    }

    ngOnInit() {
      this.formGroup = this.getFormGroup();
      this.getGroups();
    }

    sendInvitation() {
      this.visible = false;
      const invitation: Invitation = {
        email: this.formGroup.value.email,
        groupId: this.formGroup.value.groupId
      };
      this.invitationService.createInvitation(invitation).subscribe({
        next: (response) => {
          this.messageService.add({severity:'success', summary: 'Convite enviado', detail: 'Convite enviado com sucesso para ' + this.formGroup.value.email});
          this.formGroup.reset();
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Erro ao enviar convite', detail: 'Não foi possível enviar o convite. Tente novamente.'});
          console.error('Erro ao enviar convite:', error);
        }
      });
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
      }
    })
  }

  getFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      groupId: ['', Validators.required]
    });
  }
  
}
