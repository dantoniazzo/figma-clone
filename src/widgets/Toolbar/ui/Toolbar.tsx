import { Button } from 'shared/ui/Button';
import { toolsConfig } from '../model/tools.config';

export const Toolbar = () => {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex align-middle justify-between bg-gray-500 p-2 rounded-lg shadow-lg gap-2">
      {Object.values(toolsConfig).map((tool, i) => {
        return (
          <Button
            key={`toolbar-button-${i}`}
            selected={tool.enabled}
            classNames="rounded-lg bg-gray-700 hover:bg-gray-400 active:bg-gray-800"
            disabled={!tool.enabled}
          >
            {tool.icon}
          </Button>
        );
      })}
    </div>
  );
};
