import { getStage } from "entities/stage";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { Position } from "shared/model";

const scaleBy = 1.05;

export const scaleStageOnScroll = (
  e: KonvaEventObject<WheelEvent, Node<NodeConfig>>
) => {
  // stop default scrolling
  e.evt.preventDefault();
  const stage = e.target.getStage();
  if (!stage) return;
  const oldScale = stage.scaleX();
  const pointer = stage.getPointerPosition();
  if (!pointer) return;
  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  let direction = e.evt.deltaY > 0 ? 1 : -1;
  if (e.evt.ctrlKey) {
    direction = -direction;
  }

  const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scaleX(newScale);
  stage.scaleY(newScale);

  const newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };

  stage.position(newPos);
};

export const unScalePosition = (position: Position) => {
  const stage = getStage();
  if (!stage) return;
  const stageScaleX = stage.scaleX();
  if (!stageScaleX) return;
  return {
    x: position.x / stageScaleX - stage.x() / stageScaleX,
    y: position.y / stageScaleX - stage.y() / stageScaleX,
  };
};

export const reScalePosition = (position: Position) => {
  const stage = getStage();
  const stageScaleX = stage?.scaleX();
  if (!stage || !stageScaleX) return;
  return {
    x: (position.x + stage.x() / stageScaleX) * stageScaleX,
    y: (position.y + stage.y() / stageScaleX) * stageScaleX,
  };
};
