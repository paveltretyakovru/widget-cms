import {
  Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ViewChildren, QueryList, ElementRef, AfterViewInit
} from '@angular/core';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';
import { HeadlineComponent } from 'src/app/shared/components/widgets/widgets-panel/widgets-panel.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit {

  @ViewChild('grid') grid: NgxWidgetGridComponent;
  @ViewChildren('widgetsList', { read: ViewContainerRef })
    widgetsList: QueryList<ViewContainerRef>;

  components = [];

  public rows = 32;
  public cols = 32;
  public showGrid = true;
  public swapWidgets = false;
  public highlightNextPosition = false;

  public widgets: any[] = [];
  private _editable = true;

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

  ngOnInit() { }

  ngAfterViewInit() {
    this.initWidgetsListChangeWatcher();
  }

  initWidgetsListChangeWatcher() {
    // When widget grid have updated
    this.widgetsList.notifyOnChanges = () => {
      for (let i = 0; i < this.widgets.length; i++) {
        const widget = this.widgets[i];

        // If vidget don't have touched widget view
        if (!widget.view) {
          // Search widget view with widget id
          const view = this.widgetsList.find((item) => {
            return widget.id === item.element.nativeElement.id;
          });

          if (view) {
            widget.view = view;

            // Insert widget component to the widget
            view.createComponent(
              this.componentFactoryResolver.resolveComponentFactory(
                widget.component
              )
            );
          }
        }
      }
    };
  }

  onAddedWidget({ component, id }) {
    console.log('PageComponent#onAddedWidget()', { component });

    const color = this.getWidgetColor();
    const nextPosition = this.grid.getNextPosition();

    if (nextPosition) {
      this.widgets.push({
        id,
        view: null,
        config: { ...nextPosition, color, width: 5, height: 5 },
        component: component,
      });
    } else {
      console.warn('No Space Available!! ');
    }

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
