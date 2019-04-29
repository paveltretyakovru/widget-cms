import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { SystemConfigurationInterface } from 'src/app/shared/interfaces/system-configuration.interface';
import { MatSnackBar } from '@angular/material';

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
  file: File;
  folders: Section[];
  fetchedConfigs: ServerConfigInterface[];
  systemConfiguration: SystemConfigurationInterface;

  onClickSave(): void;
  onChangeFavicon($event: EventTarget): void;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements PanelComponentInterface, OnInit {
  // ---------------------------------------------------------------------------
  // =============================== Members ===================================
  // ---------------------------------------------------------------------------
  file: File;

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

  // ---------------------------------------------------------------------------
  // =============================== Live loop =================================
  // ---------------------------------------------------------------------------
  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Fetching and preapre index admin panel configs
    this.api.getAll$('configs')
      .subscribe((configs) => {
        const config = configs.find((c) => c.name === 'logoText');

        this.systemConfiguration = {
          logoText: (config) ? config.value : '',
        };
        this.fetchedConfigs = configs;
      });
  }


  // ---------------------------------------------------------------------------
  // =============================== Events ====================================
  // ---------------------------------------------------------------------------
  onChangeFavicon($event: EventTarget): void {
    const eventObject: MSInputMethodContext = <MSInputMethodContext> $event;
    const target: HTMLInputElement = <HTMLInputElement> eventObject.target;
    const files: FileList = target.files;

    if (files && files[0]) {
      const file: File = target.files[0];

      if (file.type === 'image/x-icon') {
        console.log('Selected icon', file);

        this.file = file;
        const formData: FormData = new FormData();

        formData.append('file', this.file);

        this.api.post$('/api/uploads/favicon', formData)
          .subscribe(response => console.log('Upload favicon', { response }));
      } else {
        this.snackBar.open(
          'Files type should be icon (*.ico)',
          null, { duration: 3000 }
        );
      }
    } else {
      this.snackBar.open('File is not selected', null, { duration: 3000 });
    }
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
