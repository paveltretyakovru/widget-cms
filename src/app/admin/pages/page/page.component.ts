import {
  Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ViewChildren, QueryList, ElementRef
} from '@angular/core';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @ViewChildren('mylist', { read: ViewContainerRef }) mylistWidgets: QueryList<ViewContainerRef>;
  @ViewChild('grid') grid: NgxWidgetGridComponent;
  @ViewChild('grid', { read: ViewContainerRef }) container: ViewContainerRef;

  components = [];

  public rows = 32;
  public cols = 32;
  public showGrid = false;
  public swapWidgets = false;
  public highlightNextPosition = false;

  public widgets: any[] = [
    { top: 1, left: 1, height: 1, width: 2, color: this.getWidgetColor() },
  ];
  private _editable = false;

  public set editable(editable: boolean) {
    this._editable = editable;
    this.showGrid = editable;
  }

  public get editable() {
    return this._editable;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  onAddedWidget(widgetComponent) {
    console.log('PageComponent#onAddedWidget()', { widgetComponent });

    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(widgetComponent);

      this.mylistWidgets.forEach((el, index, array) => {
        if (index === array.length - 1) {
          console.log('FOR EACH EL LIST', { el });
          const component = el.createComponent(componentFactory);
          this.components.push(component);
        }
      });

      // const component = '';
    //   const component = this.container.createComponent(componentFactory);
    // this.components.push(component);

  }

  testClickButtonWidget() {
    console.log('Click on test buton');
  }

  addWidget() {
    const nextPosition = this.grid.getNextPosition();
    if (nextPosition) {
      this.widgets.push({color: this.getWidgetColor(), ...nextPosition, height: 5, width: 5});
    } else {
      console.warn('No Space Available!! ');
    }

    console.log('LIST!!! =>', { list: this.mylistWidgets });
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
