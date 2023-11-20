export const convertBase64ToFile = (
  base64Data: string,
  contentType: string = "image/jpeg",
  filename: string = "image.jpg"
): File => {
  // Convert the Base64 string to a Blob
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });

  // Convert the Blob to a File object
  return new File([blob], filename, { type: contentType });
};
