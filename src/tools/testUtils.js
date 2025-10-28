/**
 * Shared test utilities for QR Code Styling tests
 */

import shapeTypes from "../constants/shapeTypes";

/**
 * Creates a mock QR code object for testing
 * @param moduleCount - Number of modules in the QR code (e.g., 21 for version 1)
 * @returns Mock QR code object with mock functions
 */
export const createMockQR = (moduleCount) => ({
  getModuleCount: () => moduleCount,
  addData: () => {},
  make: () => {},
  isDark: () => false,
  createImgTag: () => "",
  createSvgTag: () => "",
  createDataURL: () => "",
  createTableTag: () => "",
  createASCII: () => "",
  renderTo2dContext: () => {}
});

/**
 * Creates base options for QR code styling with sensible defaults
 * @param overrides - Properties to override in the base options
 * @returns Complete options object for testing
 */
export const createBaseOptions = (overrides = {}) => ({
  type: "canvas",
  shape: shapeTypes.square,
  width: 300,
  height: 300,
  data: "test",
  margin: 10,
  exactSize: false,
  qrOptions: {
    typeNumber: 0,
    errorCorrectionLevel: "M"
  },
  imageOptions: {
    saveAsBlob: true,
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0
  },
  dotsOptions: {
    type: "square",
    color: "#000",
    roundSize: true
  },
  backgroundOptions: {
    round: 0,
    color: "#fff"
  },
  ...overrides
});

/**
 * Common QR code test scenarios
 */
export const TEST_QR_CODES = {
  SMALL: { moduleCount: 21, description: "Small QR (Version 1)" },
  MEDIUM: { moduleCount: 25, description: "Medium QR (Version 2)" },
  LARGE: { moduleCount: 33, description: "Large QR (Version 4)" },
  VERY_LARGE: { moduleCount: 177, description: "Very Large QR (Version 40)" }
};

/**
 * Common test canvas sizes
 */
export const TEST_CANVAS_SIZES = {
  SMALL: { width: 150, height: 150 },
  MEDIUM: { width: 300, height: 300 },
  LARGE: { width: 500, height: 500 },
  RECTANGULAR: { width: 400, height: 200 }
};