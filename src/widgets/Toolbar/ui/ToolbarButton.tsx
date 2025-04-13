import { Button } from 'shared';
import { Tools, toolsConfig } from '../model/tools.config';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  tool: Tools;
  onClick: () => void;
  selectedTool: Tools;
}

export const ToolbarButton = (props: ToolbarButtonProps) => {
  return (
    <Button
      disabled={!toolsConfig[props.tool].enabled}
      onClick={props.onClick}
      className={`rounded-lg  ${
        props.selectedTool === props.tool ? 'bg-blue' : 'bg-gray-500'
      } hover:bg-gray-400`}
    >
      {toolsConfig[props.tool].icon}
    </Button>
  );
};
