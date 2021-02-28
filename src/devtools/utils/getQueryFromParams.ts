export const getQueryFromParams = (params = []) => {
  return decodeURIComponent(
    params.find((param) => param.name === "query").value
  );
}