import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GridData } from '../grid.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';
import { filter } from 'rxjs/operators';
import { WidgetContentInterface } from '../interfaces/widget';

export interface PaginationLinkInterface {
  link: string;
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetContainerComponent implements OnInit, OnDestroy {
  @Input() data: GridData;
  @Input() editable = false;
  @Input() collection: string;

  paginationLinks: PaginationLinkInterface[] = [];
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
    this.prepareModelInfromation();
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

  prepareModelInfromation() {
    // If widget have attached model infromation
    if (this.content.model) {
      const documentId = this.route.snapshot.params.document;

      // If current route have a document property
      if (documentId) {
        const document = this.data.documents.find(doc => doc._id === documentId);

        /**
         * What we have: current content.field||.group and GET page document
         * Whe should replace content.field { id (field id), documentId }
         * to { id = page document field id, documentId = page document id }
         * and if content have group of widgets that we need to update
         * group widget fields lika a top example algorithm
         */
        const replaceCtxField = (ctx: WidgetContentInterface, doc: CmsDocument) => {
          // If group child is a field
          if (ctx.field) {
            const field = this.getFieldFromDataById(ctx.field);

            if (doc) {
              // replaceWidget.content.id && replaceWidget.content.documentId
              const searchField = doc.fields
                .find(fieldItem => fieldItem.name === field.name);

              if (searchField) {
                ctx.field.id = searchField._id;
                ctx.field.documentId = doc._id;
              }
            }
          }
        };

        // If current widget is widget, replace widget data
        if (this.content.field) {
          replaceCtxField(this.content, document);
        }

        // else if is the widgets group, then each of widgets and replace fields
        if (this.content.group) {
          this.content.group.forEach((widget) => {
            replaceCtxField(widget.content, document);
          });
        }
      }
    }
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
              link: `/p/${this.route.snapshot.params.id}/l/${i}`,
              active: +currentPage === i,
            });
          }
        }

        const replacePaginationFieldData = (replaceWidget, widgetIndex) => {
          // If group child is a field
          if (replaceWidget.content.field) {
            const field = this.getFieldFromDataById(replaceWidget.content.field);
            const currentPageDocument = currentPageDocuments[widgetIndex];

            if (currentPageDocument) {
              // replaceWidget.content.id && replaceWidget.content.documentId
              const searchField = currentPageDocuments[widgetIndex].fields
                .find(fieldItem => fieldItem.name === field.name);

              if (searchField) {
                replaceWidget.content.field.id = searchField._id;
                replaceWidget.content.field.documentId = currentPageDocuments[
                  widgetIndex
                ]._id;
              }
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
          docs: this.data.documents,
          field: this.content.field,

          test: this.data.documents.find((doc) => (
            this.content.field.id === doc._id
          )),
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
