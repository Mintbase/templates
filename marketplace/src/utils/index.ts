export const parseMedia = (media: string, baseUri: string) => {
  let mediaUrl = media?.indexOf('http') > -1 ? media : `${baseUri}/${media}`;

  if (!media) {
    mediaUrl = null;
  }

  return { mediaUrl };
};
