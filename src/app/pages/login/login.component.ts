import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  error: string | null = null;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private httpClient: HttpClient, private router: Router) {}

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.httpClient
      .post('https://pk-center.herokuapp.com/auth/login', {
        username: this.form.getRawValue().username,
        password: this.form.getRawValue().password
      })
      .subscribe((x: any) => {
        localStorage.setItem('token', JSON.stringify({value: x.access_token}))
        this.router.navigate(['./']);
      });
  }
}
