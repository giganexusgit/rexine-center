/**
 * Central app configuration derived from environment variables.
 * All VITE_ prefixed vars are exposed to the browser at build time.
 */

/** Base URL of the site, e.g. https://rexinecentre.com */
export const SITE_URL: string =
  import.meta.env.VITE_SITE_URL ?? 'https://rexinecentre.com';

/** Google reCAPTCHA v3 Public Site Key */
export const RECAPTCHA_SITE_KEY: string =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';

/** Build a full URL from a relative path */
export const siteUrl = (path: string): string =>
  `${SITE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

