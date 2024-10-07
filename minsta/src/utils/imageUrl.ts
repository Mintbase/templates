export const getImageUrl = (imageUrl: string) => {
  if (!imageUrl) return "";

  return imageUrl.includes("https://arweave.net")
    ? imageUrl
    : `https://arweave.net/${imageUrl}`;
};
