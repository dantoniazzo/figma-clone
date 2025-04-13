import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';

export const STAGE_ELEMENT_ID = 'stage-element';

export const getStageElement = (): HTMLElement | null =>
  document.getElementById(STAGE_ELEMENT_ID);

export const getStage = (): Stage | undefined => {
  const stageElement = getStageElement();
  return stageElement
    ? Konva.stages.find((s) => s.container() === stageElement)
    : undefined;
};
