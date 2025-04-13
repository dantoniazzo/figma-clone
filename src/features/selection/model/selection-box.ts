import { Position } from 'shared/model';
import { selectionBoxConfig } from './selection-box.config';
import { getStage } from 'entities/stage';
import { Node } from 'konva/lib/Node';
import {
  getDrawnRectangleBox,
  createRectangle,
  updateRectangle,
} from 'features/rectangle';
import { SELECTION_BOX_ID } from '../lib';

export const getSelectionBox = () => {
  return getDrawnRectangleBox(SELECTION_BOX_ID);
};

export const createSelectionBox = (position: Position) => {
  createRectangle({
    id: SELECTION_BOX_ID,
    position,
    ...selectionBoxConfig,
  });
};

export const updateSelectionBox = (position: Position) => {
  updateRectangle(position, SELECTION_BOX_ID);
};

export const getAllSelectionBoxes = () => {
  return getStage()?.find(`#${SELECTION_BOX_ID}`);
};

export const removeSelectionBoxes = () => {
  const selectionBoxes = getAllSelectionBoxes();
  selectionBoxes?.forEach((box: Node) => {
    box.destroy();
  });
};
