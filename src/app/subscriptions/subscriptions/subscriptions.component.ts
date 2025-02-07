import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { StripeService } from 'ngx-stripe';
import { jwtDecode } from 'jwt-decode';
import { TransactionsService } from '../../transactions/transactions.service';

export interface TokenDeco {
  plano: String[]
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit { 

  isPremium = false;

  constructor(
    private auth0: AuthService,
    private http: HttpClient,
    private stripeService: StripeService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
    this.auth0.idTokenClaims$.subscribe((token) => {
      if (token) {
        const decodedToken: TokenDeco = jwtDecode(token.__raw);
        decodedToken.plano.forEach((plano) => {
          if (plano === 'PAID') {
            this.isPremium = true;
          }
        });
      }
    })
  }
  
  checkout() {
    this.http.post<{ id: string }>('http://localhost:8080/create-checkout-session', {})
    .subscribe(session => {
      this.stripeService
        .redirectToCheckout({ sessionId: session.id })
        .subscribe( (result) => {
          if (result.error) {
            console.error(result.error.message);
          }
        })
    })
  }

  cancelSubscription() {
    this.transactionsService.cancelPlan().subscribe({
      next: (x) => {
        this.isPremium = false;
        console.log(x);
      },
      error: (error) => {
        console.error(error);
    }})
  }

}
