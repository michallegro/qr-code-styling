import cornerDotTypes from "../../constants/cornerDotTypes";
import { CornerDotType, DrawArgs, Window } from "../../types";
import QRFigureBase from "../QRFigureBase";

export const availableCornerDotTypes = Object.values(cornerDotTypes);

export default class QRCornerDot extends QRFigureBase {
  _type: CornerDotType;

  constructor({ svg, type, window }: { svg: SVGElement; type: CornerDotType; window: Window }) {
    super(svg, window);
    this._type = type;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const type = this._type;
    let drawFunction;

    switch (type) {
      case cornerDotTypes.square:
        drawFunction = this._drawSquare;
        break;
      case cornerDotTypes.dot:
      default:
        drawFunction = this._drawDot;
    }

    drawFunction.call(this, { x, y, size, rotation });
  }

  _drawDot({ x, y, size, rotation }: DrawArgs): void {
    this._basicDot({ x, y, size, rotation });
  }

  _drawSquare({ x, y, size, rotation }: DrawArgs): void {
    this._basicSquare({ x, y, size, rotation });
  }
}
