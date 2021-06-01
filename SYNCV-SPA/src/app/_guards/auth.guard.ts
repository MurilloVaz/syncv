import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!localStorage.getItem('token')) {
            this.toastr.error('Você precisa estar logado para acessar essa área.', 'Erro');
            this.router.navigate(['/login']);
        } else {
            if (this.authService.loggedIn()) {
                return true;
            } else {
                this.toastr.error('Sua sessão expirou', 'Erro');
                return false;
            }
        }

    }
}
