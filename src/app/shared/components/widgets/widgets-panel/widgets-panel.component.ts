import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
import { makeId } from 'src/app/shared/helpers/make-id';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-headline-component-control',
  template: `
    <div>
      <h2 class="mat-title">Headline widget settings</h2>

      <app-widgets-data-controller (dataSelected)="dataSelected($event)">
      </app-widgets-data-controller>
    </div>
  `
})
export class HeadlineControlComponent {
  constructor(
    public dialogRef: MatDialogRef<HeadlineControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('HeadlineControlComponent#constructor()', { data });
  }

  dataSelected($event) {
    this.dialogRef.close($event);
  }
}

@Component({
  selector: 'app-my-foo',
  template: `
    <div [innerHtml]="options ? options : 'Headline component 1'"></div>
  `
})
export class HeadlineComponent {
  private _options = new BehaviorSubject<any>(null);

  @Input()
    get options () { return this._options.getValue(); }
    set options (value) {
      this._options.next(this.sanitizer.bypassSecurityTrustHtml(value));
    }

  constructor(private sanitizer: DomSanitizer) {}

  widget = { top: 1, left: 1, height: 1, width: 2, color: 'rgba(0,0,0,.0)'};
  editable = true;
}

@Component({
  selector: 'app-widgets-panel',
  templateUrl: './widgets-panel.component.html',
  styleUrls: ['./widgets-panel.component.scss']
})
export class WidgetsPanelComponent implements OnInit {
  @Output() addedWidget = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addWidgetHandler() {
    console.log('WidgetPanelComponent#addWidgetHandler()');
    this.addedWidget.emit({
      id: `widget-${makeId()}`,
      control: HeadlineControlComponent,
      component: HeadlineComponent,
    });
  }

}
