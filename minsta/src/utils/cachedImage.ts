export const getCachedImage = (
  image: string,
): string | null => {
  let url: string | null = null
  const checkCache =
   'https://image-cache-service-z3w7d7dnea-ew.a.run.app/media?url='


  // if image is passed as null, just return null
  if (!image) {
    return null
  }

  if (!checkCache) {
    console.error(
      'NEXT_PUBLIC_IMAGE_CACHE_MEDIA_URL and/or NEXT_PUBLIC_IMAGE_CACHE_THUMBNAIL_URL are not defined in process.env'
    )
    return image
  }

  url = `${checkCache}${image}`

  return url
}