import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error: string | null = null;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private httpClient: HttpClient) {}

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.httpClient
      .post('https://pk-center.herokuapp.com/auth/login', {
        username: this.form.getRawValue().username,
        password: this.form.getRawValue().password
      })
      .subscribe(x => {
        console.log('login successfully', x);
      });
  }
}
