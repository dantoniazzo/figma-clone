import {
  MousePointer2,
  Pencil,
  Square,
  Spline,
  ALargeSmall,
  Frame,
} from 'lucide-react';

export enum Tools {
  POINTER = 'pointer',
  PENCIL = 'pencil',
  RECTANGLE = 'rectangle',
  LINE = 'line',
  TEXT = 'text',
  FRAME = 'frame',
}

export interface ToolConfig {
  icon: React.ReactNode;
  enabled: boolean;
}

export const toolsConfig: { [key in Tools]: ToolConfig } = {
  [Tools.POINTER]: {
    icon: <MousePointer2 />,
    enabled: true,
  },
  [Tools.PENCIL]: {
    icon: <Pencil />,
    enabled: false,
  },
  [Tools.RECTANGLE]: {
    icon: <Square />,
    enabled: false,
  },
  [Tools.LINE]: {
    icon: <Spline />,
    enabled: false,
  },
  [Tools.TEXT]: {
    icon: <ALargeSmall />,
    enabled: false,
  },
  [Tools.FRAME]: {
    icon: <Frame />,
    enabled: false,
  },
};
