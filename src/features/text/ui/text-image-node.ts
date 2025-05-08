import { selectNode } from "features/selection";
import Konva from "konva";
import { Position } from "shared/model";
import { createTextNode, InitialText } from "../model";
import { reScalePosition } from "features/scale";

export interface TextImageNodeProps {
  id: string;
  initialText: InitialText;
  position?: Position;
  image?: CanvasImageSource;
}

export const TextImageNode = (props: TextImageNodeProps) => {
  const textImage = new Konva.Image({
    id: props.id,
    initialText: props.initialText,
    x: props.position?.x,
    y: props.position?.y,
    image: props.image,
    draggable: true,
    scaleX: 1 / window.devicePixelRatio,
    scaleY: 1 / window.devicePixelRatio,
  });
  textImage.on("mousedown", (e) => {
    const initialText = textImage.getAttr("initialText") as InitialText;
    selectNode(e.target);
    const position = { x: e.target.x(), y: e.target.y() };
    const reScaledPosition = reScalePosition(position);
    if (!reScaledPosition) return;
    createTextNode({ id: props.id, initialText, position: reScaledPosition });
  });
  return textImage;
};
