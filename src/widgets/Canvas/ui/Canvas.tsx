import Konva from 'konva';
import { getStage, STAGE_ELEMENT_ID } from 'entities/stage';
import { Stage, Layer, Transformer } from 'react-konva';
import {
  createSelectionBox,
  getSelectionBox,
  removeSelectionBoxes,
  selectNode,
  unSelectAllNodes,
  updateSelectionBox,
} from 'features/selection';
import { getTool, Tools } from 'widgets/Toolbar';
import { getPointerPosition } from 'features/pointer';
import {
  createRectangle,
  finishDrawingRectangle,
  getDrawnRectangleBox,
  updateRectangle,
} from 'features/rectangle';
import { LAYER_ID } from 'entities/layer';

export const Canvas = () => {
  const handlePointerDown = (e: Konva.KonvaEventObject<PointerEvent>) => {
    const isMouseOnStage = e.target === e.currentTarget;
    if (isMouseOnStage) {
      // Whenever user has pointer down on stage we remove selection from all nodes
      unSelectAllNodes();
      if (e.evt.ctrlKey || e.evt.metaKey || getTool() === Tools.POINTER) {
        const pointerPos = getPointerPosition();
        if (pointerPos) {
          createSelectionBox(pointerPos);
        }
      } else if (getTool() === Tools.RECTANGLE) {
        const pointerPos = getPointerPosition();
        if (pointerPos) {
          createRectangle({ position: pointerPos });
          const rect = getDrawnRectangleBox();
          if (rect) {
            selectNode(rect);
          }
        }
      }
    }
  };

  const handlePointerMove = (e: Konva.KonvaEventObject<PointerEvent>) => {
    const stage = getStage();
    if (stage) {
      if (e.evt.ctrlKey || e.evt.metaKey || getTool() === Tools.POINTER) {
        const pointerPos = getPointerPosition();
        if (pointerPos) {
          updateSelectionBox(pointerPos);
        }
      } else if (getTool() === Tools.RECTANGLE) {
        const pointerPos = getPointerPosition();
        if (pointerPos) {
          updateRectangle(pointerPos);
        }
      }
    }
  };

  const handlePointerUp = () => {
    const stage = getStage();
    if (stage) {
      if (getSelectionBox()) {
        removeSelectionBoxes();
      }
      if (getTool() === Tools.RECTANGLE) {
        finishDrawingRectangle();
      }
    }
  };

  return (
    <Stage
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      id={STAGE_ELEMENT_ID}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer id={LAYER_ID}>
        <Transformer keepRatio={false} />
      </Layer>
    </Stage>
  );
};
