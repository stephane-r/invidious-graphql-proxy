/**
 * @param {string} data
 * @returns string
 */
export const parseParams = (data) =>
  Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");
