import { getLayer } from 'entities/layer';
import { LINE_ANCHOR_NAME, LINE_GROUP_NAME } from 'features/line';
import { RECTANGLE_NAME } from 'features/rectangle';

export const findNode = (id: string) => {
  const layer = getLayer();
  if (!layer) {
    return null;
  }

  const node = layer.findOne(`#${id}`);
  return node;
};

export const getAllNodes = () => {
  const layer = getLayer();
  if (!layer) return null;

  const rectNodes = layer.find(`.${RECTANGLE_NAME}`);
  const lineNodes = layer.find(`.${LINE_GROUP_NAME}`);
  const lineAnchors = layer.find(`.${LINE_ANCHOR_NAME}`);
  return rectNodes.concat(lineNodes).concat(lineAnchors);
};
