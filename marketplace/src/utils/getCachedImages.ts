export const getCachedImage = (
  image: string,
  useThumbnail?: boolean,
): string => {
  let url: string = null;
  const checkCache = typeof process.env.NEXT_PUBLIC_IMAGE_CACHE_MEDIA_URL === 'string';
  const checkThumbnailCache = typeof process.env.NEXT_PUBLIC_IMAGE_CACHE_THUMBNAIL_URL === 'string';
  const checkImage = typeof image === 'string';

  // if image is passed as null, just return null
  if (!image) {
    return null;
  }

  if (!checkCache) {
    console.error(
      'NEXT_PUBLIC_IMAGE_CACHE_MEDIA_URL and/or NEXT_PUBLIC_IMAGE_CACHE_THUMBNAIL_URL are not defined in process.env',
    );
    return image;
  }

  if (useThumbnail && checkThumbnailCache) {
    url = `${process.env.NEXT_PUBLIC_IMAGE_CACHE_THUMBNAIL_URL}${image}`;
  } else if (checkCache && checkImage) {
    url = `${process.env.NEXT_PUBLIC_IMAGE_CACHE_MEDIA_URL}${image}`;
  }

  return url;
};

export const getCachedThumbnail = (image: string) => getCachedImage(image, true);
