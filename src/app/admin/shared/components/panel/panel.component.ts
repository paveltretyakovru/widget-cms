import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { SystemConfigurationInterface } from 'src/app/shared/interfaces/system-configuration.interface';

export interface ServerConfigInterface {
  _id: string;
  name: string;
  value: any;
}

export interface Section {
  name: string;
  route: string;
}

// Component interface
export interface PanelComponentInterface {
  folders: Section[];
  fetchedConfigs: ServerConfigInterface[];
  systemConfiguration: SystemConfigurationInterface;

  onClickSave(): void;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements PanelComponentInterface, OnInit {
  folders: Section[] = [
    { name: 'Models', route: '/admin/models' },
    { name: 'Collections', route: '/admin/collections' },
    { name: 'Documents', route: '/admin/documents' },
    { name: 'Pages', route: '/admin/pages' },
  ];

  systemConfiguration: SystemConfigurationInterface = {
    logoText: '',
  };

  fetchedConfigs: ServerConfigInterface[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    // Fetching and preapre index admin panel configs
    this.api.getAll$('configs')
      .subscribe((configs) => {
        this.systemConfiguration = {
          logoText: configs.find((config) => config.name === 'logoText')!.value || '',
        };
        this.fetchedConfigs = configs;
      });
  }

  onClickSave(): void {
    const requestsToUpdate$: Observable<any>[] = [];
    const requestsToCreate$: Observable<any>[] = [];

    Object.keys(this.systemConfiguration)
      .forEach((configName) => {
        const serverConfig = this.fetchedConfigs.find((config) =>  (
          config.name === configName
        ));

        const model = {
          name: configName,
          value: this.systemConfiguration[configName],
        };

        if (serverConfig) {
          requestsToUpdate$.push(
            this.api.update$('configs', serverConfig._id, model)
          );
        } else {
          requestsToCreate$.push(this.api.create$('configs', model));
        }

        if (requestsToUpdate$.length > 0) {
          forkJoin(requestsToUpdate$)
            .subscribe(configs => this.fetchedConfigs = configs);
        }

        if (requestsToCreate$.length > 0) {
          forkJoin(requestsToCreate$)
            .subscribe(configs => this.fetchedConfigs = configs);
        }
      });
  }
}
