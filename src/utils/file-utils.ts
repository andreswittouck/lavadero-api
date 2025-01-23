import fs, { mkdir } from 'fs/promises';

export async function ensureDirectoryExists(directory: string): Promise<void> {
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    // Validar si es un error con código 'EEXIST'
    if (
      error instanceof Error &&
      'code' in error &&
      (error as any).code === 'EEXIST'
    ) {
      // Si el directorio ya existe, no hacemos nada.
      return;
    }
    throw error; // Lanza otros errores
  }
}
