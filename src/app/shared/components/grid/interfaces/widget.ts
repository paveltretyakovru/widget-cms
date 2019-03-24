import { makeId } from 'src/app/shared/helpers/make-id';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';

export interface WidgetBackbone {
  position: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
  size: {
    width: number;
    height: number;
  };

  content?: {
    field?: CmsDocument;
    group?: WidgetBackbone[];
    grid?: {
      cols: number;
      rows: number;
    };
  };
}

export interface Widget extends WidgetBackbone{
  id: string;
}

export const createEmptyWidgetObject = (): Widget => {
  return {
    id: makeId(),
    size: { width: 0, height: 0 },
    position: { top: null, left: null, height: null, width: null },
  };
};

