// utils/acortarDireccion.ts
export function acortarDireccion(address: string): string {
  if (!address) return "";

  const parts = address.split(",").map(p => p.trim());

  const street = parts[0] ?? "";
  const city = parts[2] ?? "";

  return city ? `${street}, ${city}` : street;
}
