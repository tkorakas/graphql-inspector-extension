import { getQueryFromParams } from "./getQueryFromParams";
import { isContentType } from './isContentType'
export function isGraphQL(entry) {
  try {
    if (isContentType(entry, "application/graphql")) {
      return true;
    }

    if (isContentType(entry, "application/json")) {
      const json = JSON.parse(entry.request.postData.text);
      return json.query || json[0].query;
    }

    if (
      isContentType(entry, "application/x-www-form-urlencoded") &&
      getQueryFromParams(entry.request.postData.params)
    ) {
      return true;
    }
  } catch (e) {
    console.log(e);

    return false;
  }
}

