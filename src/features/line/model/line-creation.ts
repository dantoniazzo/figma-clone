import Konva from 'konva';
import { Points } from './line.types';
import { v4 as uuidv4 } from 'uuid';
import { LineConfig } from './line.config';
import { getStage } from 'entities/stage';
import { getLayer } from 'entities/layer';
import { NEW_LINE_ATTR } from '../lib';
import { findNode } from 'entities/node';
import { Line as LineType } from 'konva/lib/shapes/Line';
import { getPointerPosition } from 'features/pointer';
import { formatPoints } from './line.helpers';

export const createLine = (points: Points) => {
  const id = uuidv4();
  const newLine = new Konva.Line({
    id,
    points: formatPoints(points),
    ...LineConfig,
  });
  const stage = getStage();
  const layer = getLayer();
  if (stage && layer) {
    stage.setAttr(NEW_LINE_ATTR, id);
    layer.add(newLine);
    layer.batchDraw();
  }
};

export const drawLine = () => {
  const stage = getStage();
  const newLineId = stage?.getAttr(NEW_LINE_ATTR);
  if (newLineId) {
    const line = findNode(newLineId) as LineType;
    if (line) {
      const pointerPosition = getPointerPosition();
      const points = line.points();
      if (points && pointerPosition) {
        line.points([
          points[0],
          points[1],
          (pointerPosition.x + points[0]) / 2,
          (pointerPosition.y + points[1]) / 2,
          pointerPosition.x,
          pointerPosition.y,
        ]);
        line.getLayer()?.batchDraw();
      }
    }
  }
};

export const finishDrawingLine = () => {
  const stage = getStage();
  if (!stage) return;
  const newLineId = stage.getAttr(NEW_LINE_ATTR);
  if (newLineId) {
    const line = findNode(newLineId) as LineType;
    stage.setAttr(NEW_LINE_ATTR, null);
    if (line) {
      const points = line.points();
      if (points) {
        const lineGroup = new Konva.Group({
          draggable: true,
        });
        lineGroup.add(line);
        [0, 1, 2].forEach((i) => {
          const anchor = new Konva.Circle({
            x: points[i * 2],
            y: points[i * 2 + 1],
            radius: 5,
            fill: 'blue',
            stroke: 'gray',
            hitStrokeWidth: 20,
            draggable: true,
            name: 'circle',
          });
          anchor.on('pointerover', (e) => {
            e.target.to({
              scaleX: 1.5,
              scaleY: 1.5,
              duration: 0.1,
            });
            e.target.getLayer()?.batchDraw();
          });

          anchor.on('pointerout', (e) => {
            e.target.to({
              scaleX: 1,
              scaleY: 1,
              duration: 0.1,
            });
            e.target.getLayer()?.batchDraw();
          });
          anchor.on('dragmove', (e) => {
            const x = e.target.x();
            const y = e.target.y();
            points[i * 2] = x;
            points[i * 2 + 1] = y;
            line.points(points);
          });
          anchor.on('mousedown', (e) => {
            e.cancelBubble = true;
          });

          anchor.on('dragend', (e) => {
            const x = e.target.x();
            const y = e.target.y();
            points[i * 2] = x;
            points[i * 2 + 1] = y;
            line.points(points);
            lineGroup.getLayer()?.batchDraw();
          });
          lineGroup.add(anchor);
        });
        const layer = getLayer();
        if (!layer) return;
        layer.add(lineGroup);
        layer.batchDraw();
      }
    }
  }
};
