import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @ViewChild('grid') grid: NgxWidgetGridComponent;
  public rows = 6;
  public cols = 6;
  public showGrid = false;
  public swapWidgets = false;
  public highlightNextPosition = false;

  public widgets: any[] = [
    {
      top: 1,
      left: 1,
      height: 1,
      width: 2,
      color: this.getWidgetColor(),
    },
    {
      top: 1,
      left: 3,
      height: 1,
      width: 1,
      color: this.getWidgetColor(),
    }, {
      top: 1,
      left: 5,
      height: 1,
      width: 2,
      color: this.getWidgetColor(),
    }
  ];
  private _editable = false;

  public set editable(editable: boolean) {
    this._editable = editable;
    this.showGrid = editable;
  }

  public get editable() {
    return this._editable;
  }

  constructor() { }

  ngOnInit() {
  }

  addWidget() {
    const nextPosition = this.grid.getNextPosition();
    if (nextPosition) {
      this.widgets.push({color: this.getWidgetColor(), ...nextPosition});
    } else {
      console.warn('No Space Available!! ');
    }
  }

  askDeleteWidget(index) {
    console.log('deleting', index);
    this.widgets.splice(index, 1);
  }

  deleteWidget() {
  }

  onWidgetChange(event: WidgetPositionChange) {
  }

  getWidgetColor() {
    return 'rgba(0,0,0,.0)';
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const random = Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
    return random;
  }

  public onGridFull(e) {
    console.log(e);
  }
}
