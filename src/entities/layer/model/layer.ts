import { getStage } from 'entities/stage';
import { Layer } from 'konva/lib/Layer';

export const LAYER_ID = 'layer-element';

export const getLayer = (): Layer | undefined => {
  const stage = getStage();
  return stage ? stage.findOne(`#${LAYER_ID}`) : undefined;
};
