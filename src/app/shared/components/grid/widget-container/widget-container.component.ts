import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GridData } from '../grid.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetContainerComponent implements OnInit, OnDestroy {
  @Input() editable = false;
  @Input() data: GridData;
  @Input() collection: string;

  paginationLinks: { label: string, link: string, active: boolean }[] = [];
  currentPageDocuments: CmsDocument[] = [];

  private _routerSub = Subscription.EMPTY;

  _content = new BehaviorSubject<any>([]);
  @Input()
    get content() { return this._content.getValue(); }
    set content(content) { this._content.next(content); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.preparePaginationInformation();

    // Subsucribe to change pagination navigation to change grid content
    if (this.collection) {
      this._routerSub = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(() => this.preparePaginationInformation());
    }
  }

  ngOnDestroy() {
    this._content.unsubscribe();
    this._routerSub.unsubscribe();
  }

  preparePaginationInformation() {
    if (this.collection) {
      const documents: CmsDocument[] = [];
      for (let index = 0; index < this.data.documents.length; index++) {
        const document = this.data.documents[index];
        if (document.collectionId === this.collection) {
          documents.push(document);
        }
      }

      if (this.content && this.content.group) {
        const countWidgets = this.content.group.length;
        const countDocuments = documents.length;
        const countPages = Math.ceil(countDocuments / countWidgets);
        const currentPage = this.route.snapshot.params.list || 1;

        const startIndex = (currentPage - 1) * countWidgets;
        const endIndex = startIndex + countWidgets - 1;
        const currentPageDocuments: CmsDocument[] = [];

        for (let i = startIndex; i <= endIndex; i++) {
          currentPageDocuments.push(documents[i]);
        }

        if (this.paginationLinks.length === 0) {
          for (let i = 1; i <= countPages; i++) {
            this.paginationLinks.push({
              label: `${i}`,
              link: `/p/${this.route.snapshot.params.id}/${i}`,
              active: +currentPage === i,
            });
          }
        }

        const replacePaginationFieldData = (replaceWidget, widgetIndex) => {
          // If group child is a field
          if (replaceWidget.content.field) {
            const field = this.getFieldFromDataById(replaceWidget.content.field);

            // need change ---> replaceWidget.content.id && replaceWidget.content.documentId
            const searchField = currentPageDocuments[widgetIndex].fields
              .find(fieldItem => fieldItem.name === field.name);

            if (searchField) {
              replaceWidget.content.field.id = searchField._id;
              replaceWidget.content.field.documentId = currentPageDocuments[widgetIndex]._id;
            }
          }
        };

        // Start replace wiget field data to paginatiton collection data
        this.content.group.forEach((widget, index) => {
          replacePaginationFieldData(widget, index);

          // If group child is a group of widgets
          if (widget.content.group) {
            widget.content.group.forEach((groupWidget) => {
              replacePaginationFieldData(groupWidget, index);
            });
          }
        });

      }
    }
  }

  prepareFieldValue(): SafeHtml {
    if (this.content && this.content.field) {
      const field = this.getFieldFromDataById(this.content.field);

      if (field) {
        return this.sanitizer.bypassSecurityTrustHtml(field.value);
      } else {
        console.error('Field not founed', {
          field: this.content.field, docs: this.data.documents,
          test: this.data.documents.find(doc => this.content.field.id === doc._id),
        });
        return 'Field not founded';
      }

    }

    return 'Field not selected';
  }

  routeToLink() {
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
