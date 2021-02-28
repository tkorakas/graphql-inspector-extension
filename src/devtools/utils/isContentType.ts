export const isContentType = (entry, contentType) => {
  return entry.request.headers.some(({ name, value }) => {
    return (
      name.toLowerCase() === "content-type" &&
      value.split(";")[0].toLowerCase() === contentType.toLowerCase()
    );
  });
}