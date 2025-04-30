import Konva from 'konva';
import { STAGE_ELEMENT_ID } from 'entities/stage';
import { Stage, Layer, Transformer } from 'react-konva';
import { LAYER_ID } from 'entities/layer';
import { useRef } from 'react';
import { scaleStageOnScroll } from 'features/scale';
import { moveStageOnScroll } from 'features/position';
import {
  handleTouchDown,
  handleTouchEnd,
  handleTouchMove,
} from 'features/touch';
import {
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
} from 'features/pointer';

export const Canvas = () => {
  const layerRef = useRef<Konva.Layer>(null);

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    // stop default scrolling
    e.evt.preventDefault();
    if (e.evt.ctrlKey || e.evt.metaKey) {
      scaleStageOnScroll(e);
    } else {
      moveStageOnScroll(e);
    }
  };

  return (
    <Stage
      onTouchStart={handleTouchDown}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      id={STAGE_ELEMENT_ID}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer ref={layerRef} id={LAYER_ID}>
        <Transformer keepRatio={false} />
      </Layer>
    </Stage>
  );
};
