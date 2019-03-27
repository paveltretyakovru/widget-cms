import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GridData } from '../grid.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';

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

        for (let i = 1; i <= countPages; i++) {
          this.paginationLinks.push({
            label: `${i}`,
            link: `/p/${this.route.snapshot.params.id}/${i}`,
            active: +currentPage === i,
          });
        }

        this.content.group.forEach((widget, index) => {

          // If group child is a field
          if (widget.content.field) {
            const field = this.getFieldFromDataById(widget.content.field);
            const document = this.data.documents.find((doc) => (
              doc._id === field._id
            ));

            // need change ---> widget.content.id && widget.content.documentId
            const searchField = currentPageDocuments[index].fields.find((f) => (
              f.name === field.name
            ));

            if (searchField) {
              widget.content.field.id = searchField._id;
              widget.content.field.documentId = currentPageDocuments[index]._id;
            }
          }

          // If group child is a group of widgets
          if (widget.content.group) {
            widget.content.group.forEach((groupWidget) => {

              // If group child is a field
              if (groupWidget.content.field) {
                const field = this.getFieldFromDataById(groupWidget.content.field);
                const document = this.data.documents.find((doc) => (
                  doc._id === field._id
                ));

                // need change ---> groupWidget.content.id && groupWidget.content.documentId
                const searchField = currentPageDocuments[index].fields.find((f) => (
                  f.name === field.name
                ));

                if (searchField) {
                  groupWidget.content.field.id = searchField._id;
                  groupWidget.content.field.documentId = currentPageDocuments[index]._id;
                }
              }
            });
          }
        });

      }
    }
  }

  ngOnDestroy() {
    this._content.unsubscribe();
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
