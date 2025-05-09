import Konva from "konva";
import { getStage } from "entities/stage";
import {
  createSelectionBox,
  getSelectionBox,
  removeSelectionBoxes,
  selectNode,
  unSelectAllNodes,
  updateSelectionBox,
} from "features/selection";
import { getTool, Tools } from "widgets/Toolbar";
import {
  createRectangle,
  finishDrawingRectangle,
  getDrawnRectangleBox,
  updateRectangle,
} from "features/rectangle";
import { createLine, drawLine, finishDrawingLine } from "features/line";
import { reScalePosition, unScalePosition } from "features/scale";
import { handleDragEnd, handleDragStart } from "features/hand";
import { createFirstTextNode } from "features/text";

export const getPointerPosition = () => {
  return getStage()?.getPointerPosition();
};

export const getUnscaledPointerPosition = () => {
  const pointerPosition = getPointerPosition();
  if (!pointerPosition) return null;
  return unScalePosition(pointerPosition);
};

export const getRescaledPointerPosition = () => {
  const pointerPosition = getPointerPosition();
  if (!pointerPosition) return null;
  return reScalePosition(pointerPosition);
};

export const handlePointerDown = (
  e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
) => {
  if (getTool() === Tools.HAND) {
    handleDragStart();
  }
  const isMouseOnStage = e.target === e.currentTarget;
  if (isMouseOnStage) {
    // Whenever user has pointer down on stage we remove selection from all nodes
    unSelectAllNodes();
    if (e.evt.ctrlKey || e.evt.metaKey || getTool() === Tools.POINTER) {
      const pointerPos = getUnscaledPointerPosition();
      if (pointerPos) {
        createSelectionBox(pointerPos);
      }
    } else if (getTool() === Tools.RECTANGLE) {
      const pointerPos = getUnscaledPointerPosition();
      if (pointerPos) {
        createRectangle({ position: pointerPos });
        const rect = getDrawnRectangleBox();
        if (rect) {
          selectNode(rect);
        }
      }
    } else if (getTool() === Tools.LINE) {
      const pointerPosition = getUnscaledPointerPosition();
      if (pointerPosition)
        createLine([
          pointerPosition,
          pointerPosition,
          pointerPosition,
          pointerPosition,
        ]);
    } else if (getTool() === Tools.TEXT) {
      createFirstTextNode();
    }
  }
};

export const handlePointerMove = (
  e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
) => {
  const stage = getStage();
  if (stage) {
    if (e.evt.ctrlKey || e.evt.metaKey || getTool() === Tools.POINTER) {
      const pointerPos = getUnscaledPointerPosition();
      if (pointerPos) {
        updateSelectionBox(pointerPos);
      }
    } else if (getTool() === Tools.RECTANGLE) {
      const pointerPos = getUnscaledPointerPosition();
      if (pointerPos) {
        updateRectangle(pointerPos);
      }
    } else if (getTool() === Tools.LINE) {
      drawLine();
    }
  }
};

export const handlePointerUp = () => {
  const stage = getStage();
  if (stage) {
    if (getSelectionBox()) {
      removeSelectionBoxes();
    }
    if (getTool() === Tools.HAND) {
      handleDragEnd();
    }
    if (getTool() === Tools.RECTANGLE) {
      finishDrawingRectangle();
    }
    if (getTool() === Tools.LINE) {
      finishDrawingLine();
    }
  }
};
