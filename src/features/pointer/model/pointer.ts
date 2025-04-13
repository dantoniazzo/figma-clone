import { getStage } from 'entities/stage';

export const getPointerPosition = () => {
  return getStage()?.getPointerPosition();
};
