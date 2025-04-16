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
import { useEffect, useRef } from 'react';

export const Canvas = () => {
  const layerRef = useRef<Konva.Layer>(null);
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

  useEffect(() => {
    // Function to update dashed line points (showing control points)
    function updateDottedLines() {
      const q = quad;
      const b = bezier;

      const quadLinePath = layerRef.current?.findOne(
        '#quadLinePath'
      ) as Konva.Line;
      const bezierLinePath = layerRef.current?.findOne(
        '#bezierLinePath'
      ) as Konva.Line;

      // Update control point lines for quadratic curve
      quadLinePath?.points([
        q.start.x(),
        q.start.y(),
        q.control.x(),
        q.control.y(),
        q.end.x(),
        q.end.y(),
      ]);

      // Update control point lines for bezier curve
      bezierLinePath?.points([
        b.start.x(),
        b.start.y(),
        b.control1.x(),
        b.control1.y(),
        b.control2.x(),
        b.control2.y(),
        b.end.x(),
        b.end.y(),
      ]);
    }

    // Function to build anchor point
    function buildAnchor(x: number, y: number) {
      const anchor = new Konva.Circle({
        x: x,
        y: y,
        radius: 20,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 2,
        draggable: true,
      });
      layerRef.current?.add(anchor);

      // Add hover styling
      anchor.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
        this.strokeWidth(4);
      });

      anchor.on('mouseout', function () {
        document.body.style.cursor = 'default';
        this.strokeWidth(2);
      });

      // Update curves when anchor is moved
      anchor.on('dragmove', function () {
        updateDottedLines();
      });

      return anchor;
    }

    // Create quadratic curve with custom shape
    const quadraticLine = new Konva.Shape({
      stroke: 'red',
      strokeWidth: 4,
      sceneFunc: (ctx, shape) => {
        ctx.beginPath();
        ctx.moveTo(quad.start.x(), quad.start.y());
        ctx.quadraticCurveTo(
          quad.control.x(),
          quad.control.y(),
          quad.end.x(),
          quad.end.y()
        );
        ctx.fillStrokeShape(shape);
      },
    });
    layerRef.current?.add(quadraticLine);

    // Create bezier curve with custom shape
    const bezierLine = new Konva.Shape({
      stroke: 'blue',
      strokeWidth: 5,
      sceneFunc: (ctx, shape) => {
        ctx.beginPath();
        ctx.moveTo(bezier.start.x(), bezier.start.y());
        ctx.bezierCurveTo(
          bezier.control1.x(),
          bezier.control1.y(),
          bezier.control2.x(),
          bezier.control2.y(),
          bezier.end.x(),
          bezier.end.y()
        );
        ctx.fillStrokeShape(shape);
      },
    });
    layerRef.current?.add(bezierLine);

    // Create dashed line to show control points for quadratic curve
    const quadLinePath = new Konva.Line({
      dash: [10, 10, 0, 10],
      strokeWidth: 3,
      stroke: 'white',
      lineCap: 'round',
      id: 'quadLinePath',
      opacity: 0.3,
      points: [0, 0],
    });
    layerRef.current?.add(quadLinePath);

    // Create dashed line to show control points for bezier curve
    const bezierLinePath = new Konva.Line({
      dash: [10, 10, 0, 10],
      strokeWidth: 3,
      stroke: 'white',
      lineCap: 'round',
      id: 'bezierLinePath',
      opacity: 0.3,
      points: [0, 0],
    });
    layerRef.current?.add(bezierLinePath);

    // Create anchor points for the quadratic curve
    const quad = {
      start: buildAnchor(60, 30),
      control: buildAnchor(240, 110),
      end: buildAnchor(80, 160),
    };

    // Create anchor points for the bezier curve
    const bezier = {
      start: buildAnchor(280, 20),
      control1: buildAnchor(530, 40),
      control2: buildAnchor(480, 150),
      end: buildAnchor(300, 150),
    };

    updateDottedLines(); // Initial update of dashed lines
  }, []);

  return (
    <Stage
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
