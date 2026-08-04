/** Every desktop "open app" link and agent browser preview must use this. */
export function mobilePreviewUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/preview/frame?path=${encodeURIComponent(normalized)}`;
}

export const MOBILE_APP_ENTRY = mobilePreviewUrl("/home");
