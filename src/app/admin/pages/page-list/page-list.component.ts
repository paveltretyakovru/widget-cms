import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { Model } from '../../models/model/model';
import { ApiService } from 'src/app/shared/services/api.service';

// ~~~~~~~~~~~~~~~~~~~~~~~~ Interfaces ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export interface PagesConfigurationInterface {
  indexPage: string;
}

export interface PageListComponentInterface {
  pages$: Observable<any[]>;
  configuration: PagesConfigurationInterface;
  indexPageConfigId: string | null;

  // Methods
  prepareConfigs(configs: any[]): void;

  // Events
  onClickRowDatatable(model: Model): void;
  onIndexPageSelected($event: MatSelectChange): void;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements PageListComponentInterface, OnInit {
  pages$: Observable<any[]>;
  indexPageConfigId: string | null = null;

  configuration: PagesConfigurationInterface = {
    indexPage: null,
  };

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pages$ = this.api.getAll$('pages');

    // Fetch configurations to get index page config
    this.api.getAll$('configs').subscribe(c => this.prepareConfigs(c));
  }

  // =========================================================
  // ~~~~~~~~~~~~~~~~~~~~~~~ Methods ~~~~~~~~~~~~~~~~~~~~~~~~~
  // =========================================================
  prepareConfigs(configs: any[]): void {
    // Search index page config
    const indexPageConfig = configs.find(conf => conf.name === 'indexPage');

    // If indexPageConfig is not exists
    if (!indexPageConfig) {
      // then create the config
      this.api.create$('configs', { 'name': 'indexPage', value: null })
        .subscribe((createdConfig) => console.log({ createdConfig }));
    } else {
      // Set indexPage configuration
      this.indexPageConfigId = indexPageConfig._id;
      this.configuration.indexPage = indexPageConfig.value;
    }

    console.log('Was fetched configurations', configs);
  }

  // =========================================================
  // ~~~~~~~~~~~~~~~~~~~~~~~ Events ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // =========================================================
  onClickRowDatatable(model: Model): void {
    console.log('Clicked on datatable row', model);
    this.router.navigate([`/admin/pages/${model._id}`]);
  }

  onIndexPageSelected($event: MatSelectChange): void {
    console.log('Index page selected', $event);
    const indexPage = { name: 'indexPage', value: $event.value };

    // Update index page configuration
    this.api.update$('configs', this.indexPageConfigId, indexPage)
      .subscribe(updateIndexPageConfig => console.log({updateIndexPageConfig}));
  }
}
