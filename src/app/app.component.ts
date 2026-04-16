import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import {ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig} from 'primeng/api';

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
  messages: Message[] = [];


  constructor(
    public auth: AuthService,
    private router: Router,
    private config: PrimeNGConfig) {}

  ngOnInit(): void {
    this.menuItens = this.getMenuItens();
    this.activeItem = this.menuItens[0];
    this.menuProfile = this.getMenuProfile();
    this.config.setTranslation({
      // Nomes dos dias
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],

      // Nomes dos meses
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],

      // Botões e formatos
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy', // Formato brasileiro
      firstDayOfWeek: 0       // 0 para Domingo, 1 para Segunda
    });
  }

  getMenuItens() {
    return [
      { label: 'Dashboard', icon: 'pi pi-chart-bar', command: () => this.router.navigate(['./dashboard']) },
      { label: 'Transações', icon: 'pi pi-list', command: () => this.router.navigate(['./transactions']) },
      { label: 'Report AI', badge: 'Beta',icon: 'pi pi-tags', command: () => this.router.navigate(['./reports-ai']), },
      { label: 'Assinatura', icon: 'pi pi-credit-card', command: () => this.router.navigate(['./subscriptions']) },
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
