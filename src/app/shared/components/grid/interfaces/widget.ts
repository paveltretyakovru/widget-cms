import { makeId } from 'src/app/shared/helpers/make-id';

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

