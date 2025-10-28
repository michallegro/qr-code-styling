import resolveMargin from "./resolveMargin";
import { createMockQR, createBaseOptions } from "./testUtils";
import shapeTypes from "../constants/shapeTypes";

describe("resolveMargin", () => {
  test("returns numeric margin as-is", () => {
    const options = createBaseOptions({ margin: 20 });
    const result = resolveMargin(options);
    expect(result).toBe(20);
  });

  test("returns default for safe margin without QR code", () => {
    const options = createBaseOptions({ margin: "safe" });
    const result = resolveMargin(options);
    expect(result).toBe(4);
  });

  test("calculates safe margin for exactSize: false", () => {
    const options = createBaseOptions({
      margin: "safe",
      exactSize: false,
      width: 300,
      height: 300
    });
    const qr = createMockQR(21); // 21x21 QR code
    const result = resolveMargin(options, qr);

    // Should use traditional calculation: Math.ceil(300 / 21 * 4) = 58
    expect(result).toBe(Math.ceil(300 / 21 * 4));
  });

  test("calculates safe margin for exactSize: true", () => {
    const options = createBaseOptions({
      margin: "safe",
      exactSize: true,
      width: 300,
      height: 300
    });
    const qr = createMockQR(21); // 21x21 QR code
    const result = resolveMargin(options, qr);

    // Should use exact formula: Math.ceil((4 * 300) / (21 + 8)) = 42
    expect(result).toBe(Math.ceil((4 * 300) / (21 + 8)));
  });

  test("handles circle shape correctly", () => {
    const options = createBaseOptions({
      margin: "safe",
      exactSize: true,
      shape: shapeTypes.circle,
      width: 300,
      height: 300
    });
    const qr = createMockQR(21);
    const result = resolveMargin(options, qr);

    const adjustedSize = 300 / Math.sqrt(2);
    const expected = Math.ceil((4 * adjustedSize) / (21 + 8));
    expect(result).toBe(expected);
  });

  test("caps margin at 15% of canvas size for exactSize", () => {
    const options = createBaseOptions({
      margin: "safe",
      exactSize: true,
      width: 100,
      height: 100
    });
    // Very small QR code that would result in large margin
    const qr = createMockQR(5);
    const result = resolveMargin(options, qr);

    // Should be capped at 15% of 100 = 15
    expect(result).toBe(15);
  });

  test("handles rectangular canvas (uses minimum dimension)", () => {
    const options = createBaseOptions({
      margin: "safe",
      exactSize: true,
      width: 400,
      height: 200
    });
    const qr = createMockQR(21);
    const result = resolveMargin(options, qr);

    // Should use min(400, 200) = 200
    const expected = Math.ceil((4 * 200) / (21 + 8));
    expect(result).toBe(expected);
  });
});