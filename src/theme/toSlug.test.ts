import { describe, expect, it } from 'bun:test';
import { toSlug } from './toSlug';

describe('toSlug', () => {
  it('should convert all characters to lowercase', () => {
    const input = "HelloWorld123";
    const expectedOutput = "helloworld123";
    expect(toSlug(input)).toEqual(expectedOutput);
  });

  it('should replace spaces with dashes', () => {
    const input = "This is a test";
    const expectedOutput = "this-is-a-test";
    expect(toSlug(input)).toEqual(expectedOutput);
  });

  it('should collapse consecutive dashes into one', () => {
    const input = "This--is--a--test";
    const expectedOutput = "this-is-a-test";
    expect(toSlug(input)).toEqual(expectedOutput);
  });

  it('should remove leading and trailing dashes', () => {
    const input = "---test-example---";
    const expectedOutput = "test-example";
    expect(toSlug(input)).toEqual(expectedOutput);
  });

  it('should replace non-Latin letters and special characters with dashes', () => {
    const input = "Hello#Wörld!$123";
    const expectedOutput = "hello-w-rld-123";
    expect(toSlug(input)).toEqual(expectedOutput);
  });

  it('should handle empty input', () => {
    const input = "";
    const expectedOutput = "";
    expect(toSlug(input)).toEqual(expectedOutput);
  });

  it('should handle input with only non-Latin characters', () => {
    const input = "你好世界";
    const expectedOutput = "";
    expect(toSlug(input)).toEqual(expectedOutput);
  });

  it('should handle input with only numbers', () => {
    const input = "1234567890";
    const expectedOutput = "1234567890";
    expect(toSlug(input)).toEqual(expectedOutput);
  });

  it('should handle input with only dashes', () => {
    const input = "-----";
    const expectedOutput = "";
    expect(toSlug(input)).toEqual(expectedOutput);
  });
});