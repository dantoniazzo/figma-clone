import { getStage } from 'entities/stage';
import { unScalePosition } from 'features/scale';

export const getPointerPosition = () => {
  return getStage()?.getPointerPosition();
};

export const getUnscaledPointerPosition = () => {
  const pointerPosition = getPointerPosition();
  if (!pointerPosition) return null;
  return unScalePosition(pointerPosition);
};
