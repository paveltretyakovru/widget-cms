import { ViewContainerRef, ComponentRef } from '@angular/core';
import { WidgetsContainerComponent } from './widgets-container/widgets-container.component';
import { makeId } from '../../helpers/make-id';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';

export interface Widget {
  id?: string;
  top?: number;
  type: string;
  left?: number;
  width?: number;
  height?: number;
  widgets: Widget[];
  field?: CmsDocumentField;

  size?: {
    width: number;
    height: number;
  };

  ref?: ViewContainerRef;
  factory?: ComponentRef<WidgetsContainerComponent>;
}

export const createWidgetObject = (
  props: { type?: string, widgets?: Widget[], field?: CmsDocumentField }
) => {
  return {
    type: props.type || 'empty',
    id: `widget-${makeId()}`,

    top: null,
    left: null,
    width: null,
    height: null,

    size: {
      width: null,
      height: null,
    },

    ref: null,
    factory: null,

    field: props.field || null,
    widgets: props.widgets || [],
  };
};

export const ROOT_WIDGET: Widget = {
  id: `widget-${makeId()}`,
  type: 'group',

  top: 4, left: 1, width: 3, height: 3,
  size: { width: null, height: null },

  ref: null, factory: null,

  widgets: [
    {
      id: `widget-${makeId()}`,
      type: 'field',

      top: 1, left: 1, width: 1, height: 3,
      size: { width: null, height: null, },


      ref: null, factory: null,
      widgets: [],

      field: { name: 'name field', type: 'text', value: 'Some value text field' }
    },
    {
      id: `widget-${makeId()}`,
      type: 'group',

      top: 1, left: 3, width: 1, height: 3,
      size: { width: null, height: null },

      ref: null, factory: null,

      widgets: [{
        id: `widget-${makeId()}`,
        type: 'field',

        top: 1, left: 1, width: 1, height: 1,
        size: { width: null, height: null },

        ref: null, factory: null,
        widgets: [],

        field: { name: 'other field', type: 'text', value: 'Other value field' }
      }]
    },
  ],
};
