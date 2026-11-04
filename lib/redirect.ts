// Only allow redirects to paths on our own site.
// Without this, /login?redirect=https://evil.com could send users to another site after login.
export function safeRedirect(path: string | null | undefined, fallback = "/") {
  if (!path || !path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return fallback;
  }
  return path;
}