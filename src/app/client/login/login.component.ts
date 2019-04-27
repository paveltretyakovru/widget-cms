import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { patternValidator } from 'src/app/shared/validators/pattern-validator';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/api-response';

/* tslint:disable-next-line:max-line-length */
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    console.log('LoginComponent#ngOnInit()');
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        patternValidator(emailPattern)]
      ),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.authenticationService.login(email, password)
      .subscribe((res: ApiResponse) => {
        if (res.success) {
          // this.router.navigate(['admin']);
          this.router.navigateByUrl(this.returnUrl);
        }
      });
  }
}
