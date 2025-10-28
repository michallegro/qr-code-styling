export default function calculateSafeMargin(
  qrModuleCount: number,
  qrSize: number,
  minMargin: number = 4
): number {
  // According to ISO/IEC 18004 standard, QR codes should have a quiet zone
  // of at least 4 modules on all sides for optimal readability
  const moduleSize = qrSize / qrModuleCount;
  const recommendedMargin = moduleSize * minMargin;

  return Math.ceil(recommendedMargin);
}