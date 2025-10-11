import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitation-accept',
  templateUrl: './invitation-accept.component.html',
  styleUrl: './invitation-accept.component.css'
})
export class InvitationAcceptComponent implements OnInit {

  private http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
  
    console.log("Invitation accepted! You can now log in.");
  }

}
