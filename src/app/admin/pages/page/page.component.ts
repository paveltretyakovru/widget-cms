import {
  Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ViewChildren, QueryList, AfterViewInit, OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';

import { makeId } from 'src/app/shared/helpers/make-id';
import { WidgetSettingsComponent } from './shared/components/widget-settings/widget-settings.component';
import { WidgetContainerComponent, WidgetContainerOptions } from './shared/components/widget-container/widget-container.component';
import { WidgetEditorComponent } from './shared/components/widget-editor/widget-editor.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('grid') grid: NgxWidgetGridComponent;
  @ViewChildren('widgetsList', {read: ViewContainerRef })
    widgetsList: QueryList<ViewContainerRef>;

  rows = 12;
  cols = 12;
  widgets: any[] = [];
  showGrid = true;
  pageName = 'Untiteled';
  components = [];
  swapWidgets = false;
  highlightNextPosition = false;

  private _editable = true;

  get editable() { return this._editable; }
  set editable(editable: boolean) {
    this._editable = editable;
    this.showGrid = editable;
  }

  constructor(
    public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() { }
  ngAfterViewInit() { this.initWidgetsListChangeWatcher(); }

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

            const factory = this.componentFactoryResolver
              .resolveComponentFactory(widget.component);

            this.ngOnDestroy();

            // Insert widget component to the widget
            widget.factory = view.createComponent(factory);
            widget.factory.changeDetectorRef.detectChanges();

            // (<WidgetContainerComponent>widget.factory.instance).options = { value: 'test' };
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

  addWidget() {
    const nextPosition = this.grid.getNextPosition();

    if (nextPosition) {
      this.widgets.push({
        id: `widget-${makeId()}`,
        view: null,
        config: { ...nextPosition },
        component: WidgetContainerComponent,
        // component: WidgetEditorComponent,
      });
    } else {
      console.warn('No Space Available!! ');
    }
  }

  openWidgetSettings(widget) {
    const settings = { width: '90%', height: '90%', data: { widget } };
    const dialogRef = this.dialog.open(WidgetSettingsComponent, settings);

    dialogRef.afterClosed().subscribe((result: WidgetContainerOptions) => {
      if (result) {
        widget.factory.instance.options = result;
      }
    });
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onGridFull(e) {
    console.log(e);
  }

  askDeleteWidget(index) {
    this.widgets.splice(index, 1);
  }

  deleteWidget() {}
  onWidgetChange(event: WidgetPositionChange) {
    const widget = this.widgets[event.index];
    widget.config = { ...widget.config, ...event.newPosition };
  }
}
