export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .toLowerCase()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .trim()
    .replaceAll(" ", "-");
}
