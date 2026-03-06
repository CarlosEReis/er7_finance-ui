import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Invitation } from './invitation-form/invitation-form.component';

@Injectable({
  providedIn: 'root'
})
export class InvitatioinService {

  private readonly URL_API = environment.apiUrl.concat('invitations');

  private http = inject(HttpClient);

  createInvitation(invitation: Invitation) {
    console.log('Enviando convite:', invitation);
    return this.http.post<any>(this.URL_API, invitation);
  }

  acceptInvitation(token: string) {
    return this.http.put<any>(`${this.URL_API}/accept`, { token: token });
  }
}
