import Konva from "konva";
import { getStage, STAGE_ELEMENT_ID } from "entities/stage";
import { Stage, Layer, Transformer } from "react-konva";
import {
  createSelectionBox,
  getSelectionBox,
  removeSelectionBoxes,
  selectNode,
  unSelectAllNodes,
  updateSelectionBox,
} from "features/selection";
import { getTool, Tools } from "widgets/Toolbar";
import { getUnscaledPointerPosition } from "features/pointer";
import {
  createRectangle,
  finishDrawingRectangle,
  getDrawnRectangleBox,
  updateRectangle,
} from "features/rectangle";
import { LAYER_ID } from "entities/layer";
import { useRef } from "react";
import { createLine, drawLine, finishDrawingLine } from "features/line";
import { scaleStageOnScroll } from "features/scale";
import { moveStageOnScroll } from "features/position";
import { handleTouchEnd, handleTouchMove } from "features/touch";

export const Canvas = () => {
  const layerRef = useRef<Konva.Layer>(null);

  const handlePointerDown = (e: Konva.KonvaEventObject<PointerEvent>) => {
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
      }
    }
  };

  const handlePointerMove = (e: Konva.KonvaEventObject<PointerEvent>) => {
    console.log("touches", (e.evt as unknown as TouchEvent).touches);
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

  const handlePointerUp = () => {
    const stage = getStage();
    if (stage) {
      if (getSelectionBox()) {
        removeSelectionBoxes();
      }
      if (getTool() === Tools.RECTANGLE) {
        finishDrawingRectangle();
      }
      if (getTool() === Tools.LINE) {
        finishDrawingLine();
      }
    }
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    // stop default scrolling
    e.evt.preventDefault();
    if (e.evt.ctrlKey || e.evt.metaKey) {
      scaleStageOnScroll(e);
    } else {
      moveStageOnScroll(e);
    }
  };

  return (
    <Stage
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      id={STAGE_ELEMENT_ID}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer ref={layerRef} id={LAYER_ID}>
        <Transformer keepRatio={false} />
      </Layer>
    </Stage>
  );
};
