import Konva from "konva";
import { unScalePosition } from "features/scale";
import html2canvas from "html2canvas";
import { getQlEditor } from "../lib";
import { getLayer } from "entities/layer";

export const convertNodeToImage = async (id: string) => {
  const editorContainer = document.getElementById(id);
  const qlEditor = getQlEditor(id);
  if (!editorContainer || !qlEditor) return;
  const canvas = await html2canvas(qlEditor, {
    backgroundColor: "rgba(0,0,0,0)",
    scale: window.devicePixelRatio,
    width: qlEditor.scrollWidth,
    height: qlEditor.scrollHeight,
    useCORS: true,
    logging: false,
    allowTaint: true,
    imageTimeout: 0,
    removeContainer: true,
    y: 7,
  });
  const position = unScalePosition({
    x: editorContainer.offsetLeft,
    y: editorContainer.offsetTop,
  });
  const image = new Konva.Image({
    x: position?.x,
    y: position?.y,
    image: canvas,
    draggable: true,
    scaleX: 1 / window.devicePixelRatio,
    scaleY: 1 / window.devicePixelRatio,
  });

  getLayer()?.add(image);
  editorContainer.remove();
};
