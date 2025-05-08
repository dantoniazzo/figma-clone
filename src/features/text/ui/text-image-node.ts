import Konva from "konva"
import { Position } from "shared/model"

export const TextImageNode = ({position, image}: {position?: Position, image?: CanvasImageSource}) => {
    return new Konva.Image({
        x: position?.x,
        y: position?.y,
        image: image,
        draggable: true,
        scaleX: 1 / window.devicePixelRatio,
        scaleY: 1 / window.devicePixelRatio,
    })
}