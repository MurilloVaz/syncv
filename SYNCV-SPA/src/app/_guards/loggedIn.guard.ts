import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.loggedIn()) {
            if (this.router.url !== '/login') {
                this.toastr.error('Você precisa estar deslogado para acessar essa área.', 'Erro');
            }
            this.router.navigate(['/videosync']);
            return false;
        } else {
            return true;
        }

    }
}
