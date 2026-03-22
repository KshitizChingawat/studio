export function normalizeBaseUrl(value: string | undefined) {
  return (value || 'http://localhost:4000').replace(/\/+$/, '');
}
