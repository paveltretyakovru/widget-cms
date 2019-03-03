import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  user: User;

  constructor(private auth: AuthenticationService){ }

  ngOnInit() {
    this.auth.currentUser.subscribe((user) => {
      console.log('auth.currentUser.subscribe(): ', user);
      this.user = user;
     });
  }

}
