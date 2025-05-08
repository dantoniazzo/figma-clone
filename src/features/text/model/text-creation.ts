import { getPointerPosition } from "features/pointer";
import { EDITOR_CONTAINER_ID } from "../lib";
import { convertNodeToImage } from "./text-node-to-image";
import { getStage } from "entities/stage";
import { v4 as uuidv4 } from "uuid";
import "../ui/text.css";
import { setTool, Tools } from "widgets";
import { Position } from "shared/model";
import { InitialText } from "./text.types";
import { TextEditor } from "../ui/text-editor";
import { listenToClickOutside, removeClickOutsideListener } from "shared";
import { selectEverythingInEditor } from "./text-selection";

export const onClickOutside = (id: string) => {
  convertNodeToImage(id);
};

export const createFirstTextNode = async () => {
  const id = `${EDITOR_CONTAINER_ID}-${uuidv4()}`;
  const initialText = "Text";
  const pointerPosition = getPointerPosition();
  if (!pointerPosition) return;
  createTextNode({
    id,
    initialText,
    position: pointerPosition,
    shouldSelect: true,
  });
};
export interface TextCreationProps {
  id: string;
  initialText: InitialText;
  position: Position;
  shouldSelect?: boolean;
  shouldDisable?: boolean;
}

export const createTextNode = async (props: TextCreationProps) => {
  // Create editor container
  const editorContainer = document.createElement("div");
  editorContainer.id = props.id;
  editorContainer.style.position = "absolute";
  editorContainer.style.top = `${props.position.y}px`;
  editorContainer.style.left = `${props.position.x}px`;
  editorContainer.style.transformOrigin = "top left";
  editorContainer.style.transform = `scale(${getStage()?.scaleX()}, ${getStage()?.scaleY()})`;
  document.body.appendChild(editorContainer);
  const quill = TextEditor({ id: props.id });
  if (props.shouldDisable) quill.disable();
  const onDblClick = () => {
    quill.enable();
    selectEverythingInEditor({ quill });
  };
  editorContainer.addEventListener("dblclick", onDblClick);
  if (typeof props.initialText === "string") {
    quill.setText(props.initialText);
  } else {
    quill.setContents(props.initialText);
  }
  if (props.shouldSelect) selectEverythingInEditor({ quill });
  setTimeout(() => {
    quill.focus();
  });
  const handleClickOutside = () => {
    onClickOutside(props.id);
    removeClickOutsideListener(editorContainer);
    editorContainer.removeEventListener("dblclick", onDblClick);
  };
  listenToClickOutside(editorContainer, handleClickOutside);
  const stage = getStage();
  if (!stage) return;
  stage.on("xChange yChange scaleXChange scaleYChange", () => {
    handleClickOutside();
  });
  setTool(Tools.POINTER);
};
