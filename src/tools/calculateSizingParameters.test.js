import calculateSizingParameters from "./calculateSizingParameters";
import { createMockQR, createBaseOptions } from "./testUtils";
import shapeTypes from "../constants/shapeTypes";

describe("calculateSizingParameters", () => {
  test("calculates parameters for non-exactSize mode", () => {
    const options = createBaseOptions({
      width: 300,
      height: 300,
      margin: 10,
      exactSize: false
    });
    const qr = createMockQR(21);

    const result = calculateSizingParameters(options, qr);

    expect(result.resolvedMargin).toBe(10);
    expect(result.actualWidth).toBe(300);
    expect(result.actualHeight).toBe(300);
    expect(result.realQRSize).toBe(280); // 300 - 10*2
    expect(result.dotSize).toBe(280 / 21); // realQRSize / moduleCount
  });

  test("calculates parameters for exactSize mode", () => {
    const options = createBaseOptions({
      width: 300,
      height: 300,
      margin: 10,
      exactSize: true,
      dotsOptions: { roundSize: true, type: "square", color: "#000" }
    });
    const qr = createMockQR(21);

    const result = calculateSizingParameters(options, qr);

    expect(result.resolvedMargin).toBe(10);
    expect(result.realQRSize).toBe(280); // 300 - 10*2

    // For exactSize with roundSize=true, uses Math.floor
    const expectedDotSize = Math.floor(280 / 21);
    expect(result.dotSize).toBe(expectedDotSize);

    const expectedQRSize = expectedDotSize * 21;
    expect(result.actualWidth).toBe(expectedQRSize + 20); // + margin*2
    expect(result.actualHeight).toBe(expectedQRSize + 20);
  });

  test("handles circle shape correctly", () => {
    const options = createBaseOptions({
      width: 300,
      height: 300,
      margin: 10,
      shape: shapeTypes.circle
    });
    const qr = createMockQR(21);

    const result = calculateSizingParameters(options, qr);

    const expectedRealQRSize = 280 / Math.sqrt(2); // adjusted for circle
    expect(result.realQRSize).toBeCloseTo(expectedRealQRSize, 5);
  });

  test("uses custom roundSize function when provided", () => {
    const options = createBaseOptions();
    const qr = createMockQR(21);
    const mockRoundSize = jest.fn(x => Math.ceil(x));

    calculateSizingParameters(options, qr, { roundSize: mockRoundSize });

    expect(mockRoundSize).toHaveBeenCalled();
  });

  test("uses calculateOptimalDotSize when provided for exactSize", () => {
    const options = createBaseOptions({ exactSize: true });
    const qr = createMockQR(21);
    const mockCalculateOptimalDotSize = jest.fn(() => 12);

    const result = calculateSizingParameters(options, qr, {
      calculateOptimalDotSize: mockCalculateOptimalDotSize
    });

    expect(mockCalculateOptimalDotSize).toHaveBeenCalledWith(280, 21);
    expect(result.dotSize).toBe(12);
  });

  test("handles safe margin correctly", () => {
    const options = createBaseOptions({
      margin: "safe",
      exactSize: true,
      width: 300,
      height: 300
    });
    const qr = createMockQR(21);

    const result = calculateSizingParameters(options, qr);

    // Should resolve safe margin using the formula
    const expectedMargin = Math.ceil((4 * 300) / (21 + 8));
    expect(result.resolvedMargin).toBe(expectedMargin);
  });
});