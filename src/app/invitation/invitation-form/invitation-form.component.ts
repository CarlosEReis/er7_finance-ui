import { Component, inject } from '@angular/core';
import { InvitatioinService } from '../invitatioin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrl: './invitation-form.component.css'
})
export class InvitationFormComponent {

    messageService = inject(MessageService)
    formBuilder = inject(InvitatioinService);
    invitationService = inject(InvitatioinService);

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    form: FormGroup;

    constructor() {
      this.form = inject(FormBuilder).group({
        email: ['', [Validators.required, Validators.email]]
      });
    }

    ngOnInit() {
      // Opcional: inicializar ou resetar o formulário se necessário
    }

    get emailControl() {
      return this.form.get('email');
    }

    sendInvitation() {
      this.visible = false;
      this.invitationService.createInvitation(this.form.value.email).subscribe({
        next: (response) => {
          this.messageService.add({severity:'success', summary: 'Convite enviado', detail: 'Convite enviado com sucesso para ' + this.form.value.email});
          this.form.reset();
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Erro ao enviar convite', detail: 'Não foi possível enviar o convite. Tente novamente.'});
          console.error('Erro ao enviar convite:', error);
        }
      });
    }


}
