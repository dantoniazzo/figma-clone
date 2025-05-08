import { getPointerPosition } from "features/pointer";
import { EDITOR_CONTAINER_ID, getQlEditor } from "../lib";
import { convertNodeToImage } from "./text-node-to-image";
import { getStage } from "entities/stage";
import { v4 as uuidv4 } from "uuid";
import "../ui/text.css";
import { setTool, Tools } from "widgets";
import { Position } from "shared/model";
import { InitialText } from "./text.types";
import { TextEditor } from "../ui/text-editor";
import { listenToClickOutside, removeClickOutsideListener } from "shared";

export interface TextCreationProps {
  id: string;
  initialText: InitialText;
  position: Position;
}

export const onClickOutside = (id: string) => {
  console.log("onClickOutside", id);
  convertNodeToImage(id);
};

export const createFirstTextNode = async () => {
  const id = `${EDITOR_CONTAINER_ID}-${uuidv4()}`;
  const initialText = "Text";
  const pointerPosition = getPointerPosition();
  if (!pointerPosition) return;
  createTextNode({ id, initialText, position: pointerPosition });
};

export const createTextNode = async ({
  id,
  initialText,
  position,
}: TextCreationProps) => {
  // Create editor container
  const editorContainer = document.createElement("div");
  editorContainer.id = id;
  editorContainer.style.position = "absolute";
  editorContainer.style.top = `${position.y}px`;
  editorContainer.style.left = `${position.x}px`;
  editorContainer.style.transformOrigin = "top left";
  editorContainer.style.transform = `scale(${getStage()?.scaleX()}, ${getStage()?.scaleY()})`;
  document.body.appendChild(editorContainer);

  const quill = TextEditor({ id });
  quill.disable();
  if (typeof initialText === "string") {
    quill.setText(initialText);
  } else {
    quill.setContents(initialText);
  }
  quill.setSelection(0, quill.getLength());
  setTimeout(() => {
    quill.focus();
  });
  const qlEditor = getQlEditor(id);
  const handleClickOutside = () => {
    onClickOutside(id);
    removeClickOutsideListener(qlEditor);
  };
  listenToClickOutside(qlEditor, handleClickOutside);
  setTool(Tools.POINTER);
};
