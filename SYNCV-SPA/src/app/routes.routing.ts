import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageLogsComponent } from './page-logs/page-logs.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/loggedIn.guard';
import { PageVideosyncComponent } from './page-videosync/page-videosync.component';

const routes: Routes = [
  { path: 'videosync', component: PageVideosyncComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: PageDashboardComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: PageLogsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: PageLoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: PageRegisterComponent, canActivate: [LoggedInGuard] },

  { path: '**', redirectTo: 'login', pathMatch: 'full', canActivate: [LoggedInGuard] }

];

export const appRoutes = RouterModule.forRoot(routes);
