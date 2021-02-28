import { ChromeRequest } from "../../types";

export const isContentType = (entry: ChromeRequest, contentType: string) => {
  return entry.request.headers.some(({ name, value }) => {
    return (
      name.toLowerCase() === "content-type" &&
      value.toLowerCase().includes(contentType.toLowerCase())
    );
  });
}