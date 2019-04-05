import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SystemConfigurationInterface } from '../shared/interfaces/system-configuration.interface';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  user: User;
  systemConfiguration: SystemConfigurationInterface = {
    logoText: '',
  };

  constructor(
    private api: ApiService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe((user) => {
      console.log('auth.currentUser.subscribe(): ', user);
      this.user = user;
     });

    this.api.getAll$('configs')
      .subscribe((configs) => {
        console.log('Fetched cms configs', { configs });
        configs.forEach((config) => {
          this.systemConfiguration[config.name] = config.value;
        });
     });
  }

}
