/** Every desktop "open app" link and agent browser preview must use this. */
export function mobilePreviewUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/preview/frame?path=${encodeURIComponent(normalized)}`;
}

/** Production member app = V2 (V1 kept under `/home` etc. for rollback). */
export const MEMBER_APP_HOME = "/v2/home";
export const MOBILE_APP_ENTRY = mobilePreviewUrl(MEMBER_APP_HOME);
