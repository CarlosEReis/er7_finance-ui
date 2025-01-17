import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu'
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { provideAuth0 } from '@auth0/auth0-angular';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    ToastModule,
    ToolbarModule,
    TabMenuModule,
    MenuModule,
    ButtonModule,
    AvatarModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideAuth0({
      domain: 'er7dev.us.auth0.com',
      clientId: 'AVqmAwL7ZfcZNenxkL9NiZuyLAtf6mDR',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
