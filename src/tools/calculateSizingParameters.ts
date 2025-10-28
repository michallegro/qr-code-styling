import { RequiredOptions } from "../core/QROptions";
import { QRCode } from "../types";
import resolveMargin from "./resolveMargin";
import { getAvailableQRSize } from "./sizeCalculations";

export interface SizingParameters {
  dotSize: number;
  actualWidth: number;
  actualHeight: number;
  xBeginning: number;
  yBeginning: number;
  resolvedMargin: number;
  realQRSize: number;
}

export interface SizingOptions {
  roundSize?: (size: number) => number;
  calculateOptimalDotSize?: (qrSize: number, moduleCount: number) => number;
}

/**
 * Calculates sizing parameters for QR code rendering
 * @param options - QR code options
 * @param qr - QR code instance
 * @param sizingOptions - Optional sizing functions (roundSize, calculateOptimalDotSize)
 * @returns Sizing parameters for rendering
 */
export default function calculateSizingParameters(
  options: RequiredOptions,
  qr: QRCode,
  sizingOptions: SizingOptions = {}
): SizingParameters {
  const moduleCount = qr.getModuleCount();
  const resolvedMargin = resolveMargin(options, qr);
  const realQRSize = getAvailableQRSize(options, resolvedMargin);

  let dotSize: number;
  let actualWidth: number;
  let actualHeight: number;

  if (options.exactSize) {
    if (sizingOptions.calculateOptimalDotSize) {
      // For QRSVG - uses optimal dot size calculation
      dotSize = sizingOptions.calculateOptimalDotSize(realQRSize, moduleCount);
    } else {
      // For QRCodeStyling - uses roundSize logic
      dotSize = options.dotsOptions.roundSize ? Math.floor(realQRSize / moduleCount) : (realQRSize / moduleCount);
    }
    const actualQRSize = dotSize * moduleCount;
    actualWidth = actualQRSize + resolvedMargin * 2;
    actualHeight = actualQRSize + resolvedMargin * 2;
  } else {
    if (sizingOptions.roundSize) {
      // For QRSVG - uses roundSize function
      dotSize = sizingOptions.roundSize(realQRSize / moduleCount);
    } else {
      // For QRCodeStyling - direct calculation
      dotSize = realQRSize / moduleCount;
    }
    actualWidth = options.width;
    actualHeight = options.height;
  }

  // Calculate beginning positions
  const roundSizeFn = sizingOptions.roundSize || ((size: number) => size);
  const xBeginning = roundSizeFn((actualWidth - moduleCount * dotSize) / 2);
  const yBeginning = roundSizeFn((actualHeight - moduleCount * dotSize) / 2);

  return {
    dotSize,
    actualWidth,
    actualHeight,
    xBeginning,
    yBeginning,
    resolvedMargin,
    realQRSize
  };
}