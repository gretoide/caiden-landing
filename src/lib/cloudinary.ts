type CloudinaryQuality = 'auto:eco' | 'auto:good' | 'auto';

export type CloudinaryVariant = 'thumb' | 'full' | 'hero' | 'bg';

export type CloudinaryUrlOptions = {
  variant: CloudinaryVariant;
  width: number;
  quality?: CloudinaryQuality;
};

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const folderPrefix = (import.meta.env.VITE_CLOUDINARY_FOLDER as string | undefined)?.replace(/^\/+|\/+$/g, '');

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && cloudName.trim().length > 0);
}

export function cloudinaryPublicId(publicId: string): string {
  const trimmed = publicId.replace(/^\/+|\/+$/g, '');
  if (!folderPrefix) return trimmed;
  return `${folderPrefix}/${trimmed}`;
}

function encodePublicIdForUrl(publicId: string): string {
  // Cloudinary expects slashes as path separators; encode each segment for safety (spaces, ñ, etc).
  return publicId
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function baseUrl(): string {
  if (!isCloudinaryConfigured()) {
    // Avoid bundling local fallbacks. In dev we return a harmless placeholder so the UI can render;
    // in prod we fail loudly to avoid shipping a broken deploy.
    if (import.meta.env.DEV) return '';
    throw new Error('Missing VITE_CLOUDINARY_CLOUD_NAME. Set it in .env (and Vercel env vars).');
  }
  return `https://res.cloudinary.com/${cloudName}/image/upload`;
}

function transformsFor(options: CloudinaryUrlOptions): string {
  const quality: CloudinaryQuality =
    options.quality ??
    (options.variant === 'thumb' || options.variant === 'bg' ? 'auto:eco' : 'auto:good');

  // c_limit preserves aspect ratio and never upscales.
  // dpr_auto + f_auto lets Cloudinary pick the best format per client.
  const common = ['f_auto', `q_${quality}`, 'dpr_auto', 'c_limit', `w_${options.width}`];
  return common.join(',');
}

export function cloudinaryUrl(publicId: string, options: CloudinaryUrlOptions): string {
  if (!isCloudinaryConfigured()) {
    if (import.meta.env.PROD) {
      throw new Error('Missing VITE_CLOUDINARY_CLOUD_NAME. Set it in Vercel env vars before deploying.');
    }
    return 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
  }
  const pid = encodePublicIdForUrl(cloudinaryPublicId(publicId));
  return `${baseUrl()}/${transformsFor(options)}/${pid}`;
}

export function cloudinaryPlaceholderUrl(publicId: string): string {
  if (!isCloudinaryConfigured()) {
    if (import.meta.env.PROD) {
      throw new Error('Missing VITE_CLOUDINARY_CLOUD_NAME. Set it in Vercel env vars before deploying.');
    }
    return 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
  }
  const pid = encodePublicIdForUrl(cloudinaryPublicId(publicId));
  // Tiny blurred preview used as background while the real image loads.
  return `${baseUrl()}/f_auto,q_1,w_24,e_blur:1000/${pid}`;
}

export function variantSrcSet(
  publicId: string,
  variant: CloudinaryVariant,
  widths: number[],
  quality?: CloudinaryQuality
): string {
  return widths
    .map((w) => `${cloudinaryUrl(publicId, { variant, width: w, quality })} ${w}w`)
    .join(', ');
}
