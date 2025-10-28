import { Window } from "../types";

/**
 * SVG namespace constant to avoid repetition
 */
const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Creates an SVG element with the specified tag name
 * @param window - The window object (DOM or jsdom)
 * @param tagName - The SVG tag name (e.g., "rect", "circle", "path", etc.)
 * @returns The created SVG element
 */
export function createSVGElement(window: Window, tagName: string): SVGElement {
  return window.document.createElementNS(SVG_NS, tagName);
}

/**
 * Sets multiple attributes on an SVG element at once
 * @param element - The SVG element
 * @param attributes - Object with attribute names and values
 */
export function setSVGAttributes(element: SVGElement, attributes: Record<string, string | number>): void {
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, String(value));
  });
}

/**
 * Creates an SVG element with attributes in one call
 * @param window - The window object
 * @param tagName - The SVG tag name
 * @param attributes - Optional attributes to set
 * @returns The created and configured SVG element
 */
export function createSVGElementWithAttributes(
  window: Window,
  tagName: string,
  attributes?: Record<string, string | number>
): SVGElement {
  const element = createSVGElement(window, tagName);
  if (attributes) {
    setSVGAttributes(element, attributes);
  }
  return element;
}