import { getPointerPosition } from "features/pointer";
import { EDITOR_CONTAINER_ID, getQlEditor } from "../lib";
import { convertNodeToImage } from "./text-node-to-image";
import { getStage } from "entities/stage";
import Quill from "quill";
import { v4 as uuidv4 } from "uuid";
import "../ui/text.css";
import { setTool, Tools } from "widgets";
import { Position } from "shared/model";
import { InitialText } from "./text.types";

export interface TextCreationProps {
  id: string;
  initialText: InitialText
  position: Position
}

export const createFirstTextNode = async () => {
  const id = `${EDITOR_CONTAINER_ID}-${uuidv4()}`;
  const initialText = "Text";
  const pointerPosition = getPointerPosition();
  if (!pointerPosition) return;
  createTextNode({id, initialText, position: pointerPosition});
}

export const createTextNode = async ({id, initialText, position}: TextCreationProps) => {

  // Create editor container
  const editorContainer = document.createElement("div");
  editorContainer.id = id;
  editorContainer.style.position = "absolute";
  editorContainer.style.top = `${position.y}px`;
  editorContainer.style.left = `${position.x}px`;
  editorContainer.style.transformOrigin = "top left";
  editorContainer.style.transform = `scale(${getStage()?.scaleX()}, ${getStage()?.scaleY()})`;
  document.body.appendChild(editorContainer);

  const quill = new Quill(`#${id}`, {
    modules: {
      toolbar: false,
    },
    placeholder: "Write something...",
    bounds: `#${id}`,
    theme: "snow",
  });
  if(typeof initialText === "string") {
    quill.setText(initialText);
    quill.setSelection(0, initialText.length);
  } else {
    quill.setContents(initialText);
  }
  setTimeout(() => {
    quill.focus();
    const qlEditor = getQlEditor(id);
    qlEditor.addEventListener("blur", async function () {
      convertNodeToImage(id);
    });
  });
  setTool(Tools.POINTER);
};
