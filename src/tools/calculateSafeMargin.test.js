import QRCodeStyling from "../core/QRCodeStyling";
import calculateSafeMargin from "./calculateSafeMargin";

describe("calculateSafeMargin", () => {
  test("calculates correct safe margin for different QR code sizes", () => {
    // Test with 21x21 module QR code (version 1) in 300px size
    const margin1 = calculateSafeMargin(21, 300);
    expect(margin1).toBe(Math.ceil(300 / 21 * 4)); // Should be 4 modules worth

    // Test with 25x25 module QR code (version 2) in 400px size
    const margin2 = calculateSafeMargin(25, 400);
    expect(margin2).toBe(Math.ceil(400 / 25 * 4)); // Should be 4 modules worth
  });

  test("respects minimum margin parameter", () => {
    const margin = calculateSafeMargin(21, 300, 8); // 8 modules instead of 4
    expect(margin).toBe(Math.ceil(300 / 21 * 8));
  });
});

describe("QRCodeStyling safe margin", () => {
  test("resolves safe margin correctly", () => {
    const qr = new QRCodeStyling({
      data: "test",
      width: 300,
      height: 300,
      margin: "safe"
    });

    // Access the private method for testing
    const resolvedMargin = qr._resolveMargin();

    // Should be a reasonable margin size (at least 4 pixels for a small QR code)
    expect(resolvedMargin).toBeGreaterThan(0);
    expect(typeof resolvedMargin).toBe("number");
  });

  test("resolves numeric margin as-is", () => {
    const qr = new QRCodeStyling({
      data: "test",
      width: 300,
      height: 300,
      margin: 20
    });

    const resolvedMargin = qr._resolveMargin();
    expect(resolvedMargin).toBe(20);
  });

  test("handles safe margin with no QR code", () => {
    const qr = new QRCodeStyling({
      margin: "safe"
    });

    // Should return default when no QR code is set
    const resolvedMargin = qr._resolveMargin();
    expect(resolvedMargin).toBe(4);
  });
});