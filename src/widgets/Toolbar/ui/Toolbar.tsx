import { Tools, toolsConfig } from "../model/tools.config";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getTool,
  getToolbarElement,
  getToolbarId,
  setTool,
  TOOL_ATTR_NAME,
} from "../lib/toolbar.element";
import { observeAttribute, setDataAttribute } from "shared/model";
import { ToolbarButton } from "./ToolbarButton";
import { disableHandTool, enableHandTool } from "features/hand";

export const Toolbar = () => {
  const [currentTool, setCurrentTool] = useState(Tools.POINTER);
  const toolObserver = useRef<MutationObserver | null>(null);
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === " " && getTool() !== Tools.HAND) {
      handleToolSelection(Tools.HAND);
    }
  };

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === " " && getTool() === Tools.HAND) {
      handleToolSelection(Tools.POINTER);
    }
  };

  useEffect(() => {
    const toolbar = getToolbarElement();
    if (toolbar) {
      setDataAttribute(toolbar, TOOL_ATTR_NAME, currentTool);
    }
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  const handleToolSelection = (tool: Tools) => {
    setTool(tool);

    if (tool === Tools.HAND) {
      enableHandTool();
    } else {
      disableHandTool();
    }
  };

  const ref = useCallback((node: HTMLDivElement) => {
    if (!node) {
      toolObserver.current?.disconnect();
      return;
    }
    observeAttribute(node, TOOL_ATTR_NAME, () => {
      const tool = getTool();
      if (tool) {
        setCurrentTool(tool);
      }
    });
  }, []);

  return (
    <div
      ref={ref}
      id={getToolbarId()}
      className="absolute bottom-5 left-1/2 -translate-x-1/2 flex align-middle justify-between bg-gray-500 p-2 rounded-lg shadow-lg gap-2"
    >
      {Object.values(Tools).map((tool) => {
        return (
          <ToolbarButton
            key={tool}
            onClick={() => handleToolSelection(tool)}
            icon={toolsConfig[tool].icon}
            tool={tool}
            selectedTool={currentTool}
          />
        );
      })}
    </div>
  );
};
