import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  route: string;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  folders: Section[] = [
    {
      name: 'Models',
      route: '/admin/models',
    },
    {
      name: 'Pages',
      route: '/admin/pages',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
