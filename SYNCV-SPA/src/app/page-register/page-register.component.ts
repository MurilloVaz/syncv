import { Component, OnInit, Renderer2, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserRegistration } from '../_interfaces/User';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit, OnDestroy {

  userRegister: UserRegistration = {};
  termsAccepted = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, '1-column');
    this.renderer.addClass(this.document.body, 'blank-page');
    this.renderer.setAttribute(this.document.body, 'data-col', '1-column');
  }


  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, '1-column');
    this.renderer.removeClass(this.document.body, 'blank-page');
    this.renderer.removeAttribute(this.document.body, 'data-col');
  }

  register(): void {
    if (!this.termsAccepted) {
      swal.fire('Opa', 'Se você quiser continuar, você tem que aceitar os termos', 'warning');
      return;
    }

    this.authService.register(this.userRegister).subscribe(res => {
      swal.fire('Sucesso!', 'Você está registrado e pronto para começar! :D', 'success').then((result) => {
        if (result.value) {
          this.router.navigate(['/login']);
        }
      });

    });
  }

}
