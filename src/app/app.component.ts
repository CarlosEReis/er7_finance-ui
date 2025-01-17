import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'er7_finance-ui';

  user: any;
  menuItens?: MenuItem[];
  menuProfile?: MenuItem[];
  activeItem: MenuItem = [];

  constructor(
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
      { label: 'Assinatura', icon: 'pi pi-credit-card', command: () => this.router.navigate(['./subscription']) },
    ];
  }

  logout() {
    // Todo: implementar logout
    alert('Logout')
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
