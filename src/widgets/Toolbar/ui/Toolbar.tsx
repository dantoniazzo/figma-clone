import { Tools, toolsConfig } from '../model/tools.config';
import { useEffect, useState } from 'react';
import {
  getToolbarElement,
  getToolbarId,
  TOOL_ATTR_NAME,
} from '../lib/toolbar.element';
import { setDataAttribute } from 'shared/model';
import { ToolbarButton } from './ToolbarButton';

export const Toolbar = () => {
  const [currentTool, setCurentTool] = useState(Tools.POINTER);

  useEffect(() => {
    const toolbar = getToolbarElement();
    if (toolbar) {
      setDataAttribute(toolbar, TOOL_ATTR_NAME, currentTool);
    }
  }, []);

  const handleToolSelection = (tool: Tools) => {
    const toolbar = getToolbarElement();
    if (!toolbar) return;
    setDataAttribute(toolbar, TOOL_ATTR_NAME, tool);
    setCurentTool(tool);
  };

  return (
    <div
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
