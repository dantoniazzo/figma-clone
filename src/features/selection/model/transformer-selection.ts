import { getTransformer } from 'entities/transformer';
import { Node } from 'konva/lib/Node';

export const selectNode = (node: Node) => {
  const transformer = getTransformer();
  if (transformer) {
    transformer.nodes([node]);
  }
};

export const unSelectAllNodes = () => {
  const transformer = getTransformer();
  if (transformer) {
    transformer.nodes([]);
  }
};
