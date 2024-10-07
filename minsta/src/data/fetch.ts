
export const REQUEST_HEADERS = {
  "Cache-Control": "public, max-age=31536000, immutable",
  "mb-api-key": "omni-site",
};

export enum REQUEST_METHODS {
  get = "GET",
  post = "POST",
}

export const REQUEST_OPTIONS = (method: REQUEST_METHODS) => {
  return { method: method, headers: REQUEST_HEADERS };
};

export const fetchApi = async <T>(
  url: string,
  method: REQUEST_METHODS
): Promise<T | any> => {
  try {
    const result = await fetch(url, REQUEST_OPTIONS(method));

    if (result) {
      return await result.json();
    }
  } catch (error) {
    console.error(error);
  }
};