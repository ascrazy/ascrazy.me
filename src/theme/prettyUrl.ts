export function prettyUrl(input: string): string {
  // Remove http:// or https://
  let url = input.replace(/^https?:\/\//, '');

  // Remove leading double-slash
  url = url.replace(/^\/\//, '');

  // Remove trailing slash
  url = url.replace(/\/$/, '');

  return url;
}