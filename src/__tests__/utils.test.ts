import { describe, it, expect } from "vitest";
import { formatFileSize, similarityColor } from "../lib/utils";

describe("formatFileSize()", () => {
  it("UT-F01: '0 bytes => 0.00 KB'", () => {
    return expect(formatFileSize(0)).toBe("0.00 KB");
  });
  it("UT-F02: '1 kb => 1.00 KB'", () => {
    return expect(formatFileSize(1024)).toBe("1.00 KB");
  });
  it("UT-F03: '1 mb => 1.00 MB'", () => {
    return expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
  });
  it("UT-F04: '10 m => 10.00 MB'", () => {
    return expect(formatFileSize(1024 * 1024 * 10)).toBe("10.00 MB");
  });
});

describe("similarityColor()", () => {
  it("UT-F01: 'Skor 100 - Merah'", () => {
    return expect(similarityColor(100)).toBeTruthy();
  });
  it("UT-F02: 'Skor 95 - Merah'", () => {
    return expect(similarityColor(95)).toBeTruthy();
  });
  it("UT-F03: 'Skor 80 - Kuning'", () => {
    return expect(similarityColor(80)).toBeTruthy();
  });
  it("UT-F04: 'Skor 40 - Hijau'", () => {
    return expect(similarityColor(40)).toBeTruthy();
  });
});
