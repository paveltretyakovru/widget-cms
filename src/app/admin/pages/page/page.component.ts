import {
  Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ViewChildren, QueryList, ElementRef, AfterViewInit, OnDestroy
} from '@angular/core';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';
import { MatDialog } from '@angular/material';
import { HeadlineComponent } from 'src/app/shared/components/widgets/widgets-panel/widgets-panel.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit, OnDestroy {

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
    public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
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

            const factory = this.componentFactoryResolver.resolveComponentFactory(
              widget.component
            );

            this.ngOnDestroy();

            // Insert widget component to the widget
            widget.factory = view.createComponent(factory);
            widget.factory.changeDetectorRef.detectChanges();

            // (<HeadlineComponent>widget.factory.instance).options = { value: 'test' };
          }
        }
      }
    };
  }

  ngOnDestroy() {
    for (let i = 0; i < this.widgets.length; i++) {
      const widget = this.widgets[i];

      if (widget.factory) {
        widget.factory.changeDetectorRef.detach();
      }
    }
  }

  onAddedWidget({ component, id, control }) {
    console.log('PageComponent#onAddedWidget()', { component });

    const nextPosition = this.grid.getNextPosition();

    if (nextPosition) {
      this.widgets.push({
        id,
        control,
        component,

        view: null,
        config: { ...nextPosition, width: 5, height: 5 },
      });
    } else {
      console.warn('No Space Available!! ');
    }

  }

  addWidget() {
    const nextPosition = this.grid.getNextPosition();

    if (nextPosition) {
      this.widgets.push({...nextPosition, height: 5, width: 5});
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

  openWidgetSettings(widget) {
    console.log('Widget settings', widget);

    const dialogRef = this.dialog.open(widget.control, {
      width: '90%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('DATA SELECTED!', {result, widget});

      if (result) {
        widget.factory.instance.options = result;
      }
    });
  }

  onWidgetChange(event: WidgetPositionChange) {
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
