/** iPhone 15 - single source of truth for mobile app width and preview frame. */
export const IPHONE_15 = {
  width: 393,
  height: 852,
  screenRadius: 47,
  bezelRadius: 55,
  statusBarHeight: 54,
  safeBottom: 34,
} as const;

export const IPHONE_15_CSS = {
  width: `${IPHONE_15.width}px`,
  height: `${IPHONE_15.height}px`,
  screenRadius: `${IPHONE_15.screenRadius}px`,
  bezelRadius: `${IPHONE_15.bezelRadius}px`,
} as const;

/** Browser window size when capturing previews (bezel visible). */
export const IPHONE_15_PREVIEW_VIEWPORT = {
  width: 430,
  height: 920,
} as const;
