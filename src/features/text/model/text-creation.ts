import { getPointerPosition } from "features/pointer";
import { EDITOR_CONTAINER_ID, getQlEditor } from "../lib";
import { convertNodeToImage } from "./text-node-to-image";
import { getStage } from "entities/stage";
import Quill from "quill";
import { v4 as uuidv4 } from "uuid";

export const createTextNode = async () => {
  const id = `${EDITOR_CONTAINER_ID}-${uuidv4()}`;
  // Create editor container
  const editorContainer = document.createElement("div");
  editorContainer.id = id;
  editorContainer.style.position = "absolute";
  editorContainer.style.color = "white";
  editorContainer.style.top = `${getPointerPosition()?.y}px`;
  editorContainer.style.left = `${getPointerPosition()?.x}px`;
  editorContainer.style.height = "80px";
  editorContainer.style.transformOrigin = "top left";
  editorContainer.style.transform = `scale(${getStage()?.scaleX()}, ${getStage()?.scaleY()})`;
  document.body.appendChild(editorContainer);

  const quill = new Quill(`#${id}`, {
    modules: {
      toolbar: false,
    },
    placeholder: "Compose an epic...",
    theme: "snow",
  });
  setTimeout(() => {
    quill.focus();
    const qlEditor = getQlEditor(id);
    qlEditor.addEventListener("blur", async function () {
      console.log("blur");
      convertNodeToImage(id);
    });
  });
};
