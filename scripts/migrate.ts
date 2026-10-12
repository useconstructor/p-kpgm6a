// Run with: node --conditions=react-server --import tsx scripts/migrate.ts
import { initializeDb } from '../lib/db';
await initializeDb();
console.log('Migración y catálogo demostrativo verificados. No se crean ni borran reservas.');
