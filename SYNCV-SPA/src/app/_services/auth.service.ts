import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin, UserRegistration } from '../_interfaces/User';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl + 'auth/';
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  logIn(model: UserLogin): Observable<boolean> {

    return this.http.post<any>(this.baseUrl + 'login', model).pipe(map(res => {
      if (res.tokenString) {
        localStorage.setItem('token', res.tokenString);
        return true;
      }
      return false;
    }));

  }

  logOut(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  register(model: UserRegistration): Observable<void> {
    return this.http.post<any>(this.baseUrl + 'register', model);
  }

  loggedIn(): boolean {

    try {
      if (this.helper.isTokenExpired(localStorage.getItem('token'))) {
        return false;
      }
      return true;

    } catch {
      this.logOut();
      return false;
    }

  }

}
