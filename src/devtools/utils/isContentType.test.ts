import { ChromeRequest } from "../../types";
import { isContentType } from "./isContentType";

describe('isContentType', () => {
  it('should find content type', () => {
    const request = { request: { headers: [{ name: 'Content-Type', value: 'application/json' }] } } as ChromeRequest;
    expect(isContentType(request, 'application/json')).toBeTruthy()
  });

  it('should not find content type', () => {
    const request = { request: { headers: [{ name: 'Content-Type', value: 'application/xml' }] } } as ChromeRequest;
    expect(isContentType(request, 'application/json')).toBeFalsy()
  });
});