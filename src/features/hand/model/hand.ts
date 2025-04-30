import { getAllNodes } from 'entities/node';
import { getStage, getStageElement } from 'entities/stage';

export const enableStageDragging = () => {
  const stageElement = getStageElement();
  const stage = getStage();
  if (!stageElement || !stage) return;
  stageElement.style.cursor = 'grab';
  stageElement.style.cursor = '-webkit-grab';
  stageElement.style.cursor = '-moz-grab';
  stageElement.style.cursor = '-ms-grab';
  stageElement.style.cursor = '-o-grab';

  stage.setAttr('draggable', true);
};

export const disableStageDragging = () => {
  const stageElement = getStageElement();
  const stage = getStage();
  if (!stageElement || !stage) return;
  stageElement.style.cursor = 'default';
  stageElement.style.cursor = '-webkit-default';
  stageElement.style.cursor = '-moz-default';
  stageElement.style.cursor = '-ms-default';
  stageElement.style.cursor = '-o-default';

  stage.setAttr('draggable', false);
};

export const disableDraggableNodes = () => {
  const nodes = getAllNodes();
  if (!nodes) return;
  nodes.forEach((node) => {
    node.draggable(false);
  });
};

export const enableDraggableNodes = () => {
  const nodes = getAllNodes();
  if (!nodes) return;
  nodes.forEach((node) => {
    node.draggable(true);
  });
};

export const enableHandTool = () => {
  enableStageDragging();
  disableDraggableNodes();
};

export const disableHandTool = () => {
  disableStageDragging();
  enableDraggableNodes();
};

export const handleDragStart = () => {
  const stageElement = getStageElement();
  if (!stageElement) return;
  stageElement.style.cursor = 'grabbing';
  stageElement.style.cursor = '-webkit-grabbing';
  stageElement.style.cursor = '-moz-grabbing';
  stageElement.style.cursor = '-ms-grabbing';
  stageElement.style.cursor = '-o-grabbing';
};

export const handleDragEnd = () => {
  const stageElement = getStageElement();
  if (!stageElement) return;
  stageElement.style.cursor = 'grab';
  stageElement.style.cursor = '-webkit-grab';
  stageElement.style.cursor = '-moz-grab';
  stageElement.style.cursor = '-ms-grab';
  stageElement.style.cursor = '-o-grab';
};
