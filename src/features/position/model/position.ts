import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

export const moveStageOnScroll = (
  e: KonvaEventObject<WheelEvent, Node<NodeConfig>>
) => {
  const dx = -e.evt.deltaX;
  const dy = -e.evt.deltaY;
  const stage = e.target.getStage();
  if (stage) {
    stage.x(stage.x() + dx);
    stage.y(stage.y() + dy);
  }
};
