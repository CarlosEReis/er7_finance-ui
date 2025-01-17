import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AppComponent {
  title = 'er7_finance-ui';

  user: any;
  menuItens?: MenuItem[];
  menuProfile?: MenuItem[];
  activeItem: MenuItem = [];

  constructor(
    public auth: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.menuItens = this.getMenuItens();
    this.activeItem = this.menuItens[0];
    this.menuProfile = this.getMenuProfile();
  }

  getMenuItens() {
    return [
      { label: 'Dashboard', icon: 'pi pi-chart-bar', command: () => this.router.navigate(['./dashboard']) },
      { label: 'Transações', icon: 'pi pi-list', command: () => this.router.navigate(['./transactions']) },
      //{ label: 'Assinatura', icon: 'pi pi-credit-card', command: () => this.router.navigate(['./subscription']) },
    ];
  }

  logout() {
    this.auth.logout();
  }
  
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  getMenuProfile() {
    return [
      {
        label: 'Profile',
        items: [
          {
            separator: true,
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: this.logout.bind(this),
          },
        ],
      },
    ];
  }
}
