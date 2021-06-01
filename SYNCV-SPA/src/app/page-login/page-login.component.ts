import { Component, OnInit, Renderer2, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserLogin } from '../_interfaces/User';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit, OnDestroy {
  userLogin: UserLogin = { RememberMe: true };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, '1-column');
    this.renderer.addClass(this.document.body, 'blank-page');
    this.renderer.setAttribute(this.document.body, 'data-col', '1-column');

    this.userLogin.Username = localStorage.getItem('username');
    this.userLogin.Password = localStorage.getItem('password');

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, '1-column');
    this.renderer.removeClass(this.document.body, 'blank-page');
    this.renderer.removeAttribute(this.document.body, 'data-col');
  }

  login(): void {

    if (this.userLogin.RememberMe) {
      localStorage.setItem('username', this.userLogin.Username);
      localStorage.setItem('password', this.userLogin.Password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }

    this.authService.logIn(this.userLogin).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/videosync']);
      }
    }, error => {
      this.toastr.error('Não foi possível entrar', 'Usuário ou senha incorretos!');
    });
  }
}
