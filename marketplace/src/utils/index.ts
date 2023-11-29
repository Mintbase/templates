export const parseMedia = (media: string, baseUri: string) => {
  let mediaUrl = media
    ? media?.indexOf("http") > -1
      ? media
      : `${baseUri}/${media}`
    : null;

  return { mediaUrl };
};
