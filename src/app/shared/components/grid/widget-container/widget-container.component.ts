import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GridData } from '../grid.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetContainerComponent implements OnDestroy {
  @Input() editable = false;
  @Input() data: GridData;

  _content = new BehaviorSubject<any>([]);
  @Input()
    get content() { return this._content.getValue(); }
    set content(content) { this._content.next(content); }

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnDestroy() {
    this._content.unsubscribe();
  }

  prepareFieldValue(): SafeHtml {
    if (this.content && this.content.field) {
      const field = this.getFieldFromDataById(this.content.field);
      return this.sanitizer.bypassSecurityTrustHtml(field.value);
    }

    return 'Field not selected';
  }

  routeToLink() {
    console.log('Clicked on widget container link', this.content.link);
    if (this.content.link.pageId) {
      this.router.navigate([`/p/${this.content.link.pageId}`]);
    }
  }

  // =========================================================
  //                      Search methods
  // =========================================================
  getFieldFromDataById({ id, documentId }: { id: string, documentId: string}) {
    const document = this.data.documents.find(doc => documentId === doc._id);
    return (document) ? document.fields.find(field => field._id === id) : null;
  }
}
