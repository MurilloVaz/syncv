import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {

                if (error instanceof HttpErrorResponse) {
                    if (error.status === 0) {
                        this.toastr.error('Não foi possível conectar-se ao servidor :(', 'Servidor indisponível');
                        return throwError(error.statusText);
                    }

                    if (error.status === 401) {
                        if (this.router.url !== '/login') {
                            this.router.navigate(['/login']);
                        }
                        return throwError(error.statusText);
                    }

                    const applicationError = error.headers.get('Application-Error');

                    if (applicationError) {
                        console.error(applicationError);
                        this.toastr.error('Ocorreu um erro!', applicationError);
                        return throwError(applicationError);
                    }

                    const serverError = error.error;

                    let modelStateErrors = '';

                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modelStateErrors += serverError[key] + '\n';
                            }
                        }

                        this.toastr.error(modelStateErrors, 'Formulário inválido!');
                    }

                    return throwError(modelStateErrors || serverError || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};

