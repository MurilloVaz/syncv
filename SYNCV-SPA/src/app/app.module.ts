import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { AppComponent } from './app.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { CSidebarComponent } from './c-sidebar/c-sidebar.component';
import { CHeaderComponent } from './c-header/c-header.component';
import { CFooterComponent } from './c-footer/c-footer.component';
import { CNotificationSidebarComponent } from './c-notification-sidebar/c-notification-sidebar.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { appRoutes } from './routes.routing';
import { ScriptService } from './_services/scripts.service';
import { CGlowyCardComponent } from './c-glowy-card/glowy-card.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { AuthService } from './_services/auth.service';
import { LogsService } from './_services/logs.service';
import { PaginationModule } from 'ngx-bootstrap';
import { PageLogsComponent } from './page-logs/page-logs.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ErrorInterceptorProvider } from './_interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorProvider } from './_interceptors/token.interceptor';
import { PageVideosyncComponent } from './page-videosync/page-videosync.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

@NgModule({
  declarations: [
    AppComponent,
    PageDashboardComponent,
    CSidebarComponent,
    CHeaderComponent,
    CFooterComponent,
    CNotificationSidebarComponent,
    PageLoginComponent,
    CGlowyCardComponent,
    PageRegisterComponent,
    PageLogsComponent,
    PageVideosyncComponent
  ],
  imports: [
    BrowserModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxYoutubePlayerModule.forRoot(),
    HttpClientModule,
    appRoutes
  ],
  providers: [
    ScriptService,
    AuthService,
    LogsService,
    ErrorInterceptorProvider,
    TokenInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule)