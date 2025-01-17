import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private auth: AuthService) {}

  logar() {
    this.auth.loginWithPopup().subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
