import localePt from '@angular/common/locales/pt';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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
import { MessagesModule } from 'primeng/messages';

import { AuthHttpInterceptor, authHttpInterceptorFn, AuthModule, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment.development';
import { FormsModule } from '@angular/forms';

import { NgxStripeModule } from 'ngx-stripe';

const URL_API = environment.apiUrl;

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,

    ToastModule,
    ToolbarModule,
    TabMenuModule,
    MenuModule,
    ButtonModule,
    AvatarModule,
    MessagesModule,
    
    NgxStripeModule.forRoot('pk_test_51KoXOdIgXBB86uSLi0ANrlmmcnpkUC5uq03eCicFBWLt9gmnT2mSaWHqv3ksAcwbnr5CbAmemBoimpWdI20TPYPe00MA8kU72S'),
    
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        audience: 'http://localhost:8080',
        redirect_uri: window.location.origin
      },
      httpInterceptor: {
        allowedList: [
          `${URL_API}v1/transactions`,
          `${URL_API}v1/transactions/*`,
          `${URL_API}invitations`,
          `${URL_API}invitations/accept`,
          `${URL_API}v1/report-ai`,
          `${URL_API}v1/report-ai/*`,
          `${URL_API}create-checkout-session`,
          `${URL_API}cancel-plan`
        ],
      },
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideHttpClient(),
    AuthHttpInterceptor,
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
