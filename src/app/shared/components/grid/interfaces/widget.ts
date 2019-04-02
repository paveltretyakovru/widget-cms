import { makeId } from 'src/app/shared/helpers/make-id';

export interface WidgetContentInterface {
  group?: WidgetBackbone[];
  collection?: string;

  model?: {
    id: string;
    name: string;
  };

  grid?: {
    cols: number;
    rows: number;
  };

  field?: {
    id: string;
    documentId: string
  };

  link?: {
    label: string;
    pageId: string;
    documentId?: string;
  };

  image?: string;
}

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

  content: WidgetContentInterface;
}

export interface Widget extends WidgetBackbone {
  id: string;
}

export const createEmptyWidgetObject = (): Widget => {
  return {
    id: makeId(),
    size: { width: 0, height: 0 },
    position: { top: null, left: null, height: null, width: null },
    content: {},
  };
};

