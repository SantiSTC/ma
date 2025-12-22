export function capitalizar(palabra: string): string {
  if (!palabra) return palabra;

  return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}