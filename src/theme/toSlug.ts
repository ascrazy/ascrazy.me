export function toSlug(input: string): string {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\d-]+/g, '-') // Replace non-word, non-digit characters with a single dash
    .replace(/^-+|-+$/g, '') // Remove dashes from the beginning and end
    .replace(/-+/g, '-'); // Collapse consecutive dashes into a single dash
}