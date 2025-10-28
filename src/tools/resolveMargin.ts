import { RequiredOptions } from "../core/QROptions";
import { QRCode } from "../types";
import calculateSafeMargin from "./calculateSafeMargin";
import { getCanvasSize, getTheoreticalQRSize } from "./sizeCalculations";

/**
 * Resolves the margin value for QR code rendering, handling both numeric and "safe" margins
 * @param options - QR code options containing margin, width, height, shape, and exactSize settings
 * @param qr - QR code instance (optional, if not provided defaults to 4px for "safe" margin)
 * @returns Resolved margin value in pixels
 */
export default function resolveMargin(options: RequiredOptions, qr?: QRCode): number {
  if (options.margin === "safe") {
    if (!qr) {
      return 4;
    }
    const moduleCount = qr.getModuleCount();

    if (options.exactSize) {
      const theoreticalQRSize = getTheoreticalQRSize(options);

      // Calculate exact margin that will result in exactly 4 modules
      const exactMargin = (4 * theoreticalQRSize) / (moduleCount + 8);

      // Use the exact margin to get precisely 4 modules
      // Modern SVG and Canvas rendering handles fractional pixels well
      // This gives the most accurate representation of the 4-module quiet zone

      // Cap at reasonable maximum (15% of canvas size)
      const canvasSize = getCanvasSize(options);
      const maxMargin = canvasSize * 0.15;
      return Math.min(exactMargin, maxMargin);
    } else {
      // For non-exactSize, use the traditional calculation
      const qrSize = getTheoreticalQRSize(options);
      return calculateSafeMargin(moduleCount, qrSize);
    }
  }
  return options.margin;
}