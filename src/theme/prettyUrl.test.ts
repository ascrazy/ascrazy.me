import { describe, expect, it } from 'bun:test';
import { prettyUrl } from './prettyUrl';

describe('prettyUrl', () => {
  it('should remove http:// from the beginning of the URL', () => {
    const inputURL = 'http://example.com';
    const expectedURL = 'example.com';
    expect(prettyUrl(inputURL)).toBe(expectedURL);
  });

  it('should remove https:// from the beginning of the URL', () => {
    const inputURL = 'https://www.example.com';
    const expectedURL = 'www.example.com';
    expect(prettyUrl(inputURL)).toBe(expectedURL);
  });

  it('should remove // from the beginning of the URL', () => {
    const inputURL = '//example.com';
    const expectedURL = 'example.com';
    expect(prettyUrl(inputURL)).toBe(expectedURL);
  });

  it('should handle URLs without http://, https://, // and trailing slash', () => {
    const inputURL = 'example.com';
    const expectedURL = 'example.com';
    expect(prettyUrl(inputURL)).toBe(expectedURL);
  });

  it('should handle URLs with paths and query parameters', () => {
    const inputURL = 'https://www.example.com/path/to/resource?query=value';
    const expectedURL = 'www.example.com/path/to/resource?query=value';
    expect(prettyUrl(inputURL)).toBe(expectedURL);
  });

  it('should handle URLs with trailing slashes', () => {
    const inputURL = 'https://example.com/';
    const expectedURL = 'example.com';
    expect(prettyUrl(inputURL)).toBe(expectedURL);
  });
});