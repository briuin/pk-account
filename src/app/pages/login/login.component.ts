import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  error: string | null = null;
  isLoading = false;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private httpClient: HttpClient, private router: Router) {}

  submit() {
    console.log(this.form.valid, this.isLoading);
    if (!this.form.valid || this.isLoading) {
      return;
    }
    this.error = null;
    this.isLoading = true;
    this.httpClient
      .post('https://pk-center.herokuapp.com/auth/login', {
        username: this.form.getRawValue().username,
        password: this.form.getRawValue().password
      })
      .pipe(
        tap((x: any) => {
          localStorage.setItem(
            'token',
            JSON.stringify({ value: x.access_token })
          );
          this.router.navigate(['/']);
        }),
        catchError(error => {
          this.error = 'Your username or password is incorrect';
          return throwError(error);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }
}
