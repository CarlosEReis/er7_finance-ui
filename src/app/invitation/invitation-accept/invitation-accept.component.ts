import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvitatioinService } from '../invitatioin.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invitation-accept',
  templateUrl: './invitation-accept.component.html',
  styleUrl: './invitation-accept.component.css'
})
export class InvitationAcceptComponent implements OnInit {

  private invitationService: InvitatioinService = inject(InvitatioinService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private messageService: MessageService = inject(MessageService);

  ngOnInit(): void {
  
    const inviteToken = this.activatedRoute.snapshot.params['invitationToken'];

    if (inviteToken) {
      this.invitationService.acceptInvitation(inviteToken).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Convite Aceito', detail: 'Seu convite foi aceito com sucesso! Você já pode compartilhas seua lançamentos.' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro ao aceitar convite', detail: 'Ocorreu um erro ao aceitar o convite. Por favor, tente novamente.' });
          console.error('Error accepting invitation:', error);
        }
      });
    } else {
      console.error('No invitation token found in the URL.');
    }

  }

}
