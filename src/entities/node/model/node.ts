import { getLayer } from 'entities/layer';

export const findNode = (id: string) => {
  const layer = getLayer();
  if (!layer) {
    return null;
  }

  const node = layer.findOne(`#${id}`);
  return node;
};
