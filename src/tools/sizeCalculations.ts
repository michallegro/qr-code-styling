import shapeTypes from "../constants/shapeTypes";
import { RequiredOptions } from "../core/QROptions";

/**
 * Gets the canvas size (minimum of width and height)
 * @param options - QR code options
 * @returns The smaller dimension of the canvas
 */
export function getCanvasSize(options: RequiredOptions): number {
  return Math.min(options.width, options.height);
}

/**
 * Adjusts size for circular QR codes by dividing by sqrt(2)
 * @param size - The original size
 * @param shape - The shape type
 * @returns Adjusted size for circles, original size for squares
 */
export function adjustSizeForShape(size: number, shape: string): number {
  return shape === shapeTypes.circle ? size / Math.sqrt(2) : size;
}

/**
 * Calculates the available QR size after accounting for margins
 * @param options - QR code options
 * @param margin - The margin size (in pixels)
 * @returns Available size for QR code content
 */
export function getAvailableQRSize(options: RequiredOptions, margin: number): number {
  const canvasSize = getCanvasSize(options);
  const sizeWithoutMargins = canvasSize - margin * 2;
  return adjustSizeForShape(sizeWithoutMargins, options.shape);
}

/**
 * Calculates the theoretical QR size (without margins) for initial calculations
 * @param options - QR code options
 * @returns Theoretical QR size adjusted for shape
 */
export function getTheoreticalQRSize(options: RequiredOptions): number {
  const canvasSize = getCanvasSize(options);
  return adjustSizeForShape(canvasSize, options.shape);
}