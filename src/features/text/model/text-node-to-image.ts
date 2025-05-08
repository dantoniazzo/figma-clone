import { unScalePosition } from "features/scale";
import html2canvas from "html2canvas";
import { getQlEditor } from "../lib";
import { getLayer } from "entities/layer";
import { TextImageNode } from "../ui";
import { getEditor } from "../ui/text-editor";

export const convertNodeToImage = async (id: string) => {
  const editorContainer = document.getElementById(id);
  const qlEditor = getQlEditor(id);
  if (!editorContainer || !qlEditor) return;
  editorContainer.style.height = `${qlEditor.scrollHeight + 8}px`;
  editorContainer.style.border = "none";
  const canvas = await html2canvas(qlEditor, {
    backgroundColor: "rgba(0, 0, 0, 0)",
    scale: window.devicePixelRatio,
    removeContainer: true,
    logging: false,
    useCORS: true,
    allowTaint: true,
    y: 7,
  });
  const position = unScalePosition({
    x: editorContainer.offsetLeft,
    y: editorContainer.offsetTop,
  });
  const contents = getEditor(id)?.getContents();
  if(!contents) return;
  const image = TextImageNode({id, position, image: canvas, initialText: contents})

  getLayer()?.add(image);
  editorContainer.remove();
};
