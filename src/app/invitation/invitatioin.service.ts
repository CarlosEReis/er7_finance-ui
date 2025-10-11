import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InvitatioinService {

  private readonly URL_API = environment.apiUrl.concat('invitations');

  private http = inject(HttpClient);

  createInvitation(email: string) {
    return this.http.post<any>(this.URL_API, { email: email });
  }

  acceptInvitation(token: string) {
    return this.http.put<any>(`${this.URL_API}/accept`, { token: token });
  }
}
