import { getStage } from 'entities/stage';
import { Node } from 'konva/lib/Node';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { TRANSFORMER_KEY } from '../lib';

export const TRANSFORMER_ID = 'tranformer';

export const getTransformer = () => {
  const stage = getStage();
  if (!stage) {
    return null;
  }
  return findTransformerOnStage();
};

export const findTransformerOnStage = (): Transformer | null => {
  const stage = getStage();
  if (!stage) {
    return null;
  }
  const [tranformer] = stage.find((node: Node) => {
    return node.className === TRANSFORMER_KEY;
  });
  return tranformer as Transformer;
};
