import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	registrationForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) {} 

  ngOnInit() {
		this.createForm();
  }

	createForm() {
		this.registrationForm = new FormGroup({
			email: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
		});
	}

	registrate() {
		console.log('registrate value', this.registrationForm.value);
		const { email, password } = this.registrationForm.value;

		this.authenticationService.registrate(email, password)
			.subscribe(res => console.log('Login subscribe respone', res));
	}

}
