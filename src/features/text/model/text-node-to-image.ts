import { unScalePosition } from "features/scale";
import html2canvas from "html2canvas";
import { getQlEditor } from "../lib";
import { getLayer } from "entities/layer";
import { TextImageNode } from "../ui";
import { getEditor } from "../ui/text-editor";
import { getStage } from "entities/stage";

export const convertNodeToImage = async (id: string) => {
  const editorContainer = document.getElementById(id);
  const qlEditor = getQlEditor(id);
  if (!editorContainer || !qlEditor) return;
  editorContainer.style.height = `${qlEditor.scrollHeight}px`;
  editorContainer.style.border = "none";
  editorContainer.style.opacity = "0";
  editorContainer.style.transform = "none";
  const canvas = await html2canvas(qlEditor, {
    backgroundColor: "rgba(0, 0, 0, 0)",
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
  if (!contents) return;
  const image = TextImageNode({
    id,
    position,
    image: canvas,
    initialText: contents,
  });

  getLayer()?.add(image);
  editorContainer.remove();
};
