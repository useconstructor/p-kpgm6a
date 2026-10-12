import 'server-only';
import { createClient } from '@libsql/client';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
let client: ReturnType<typeof createClient> | undefined;
export function getDb() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) throw new Error('Turso no está configurado');
  client ??= createClient({url: process.env.TURSO_DATABASE_URL, authToken:process.env.TURSO_AUTH_TOKEN});
  return client;
}
let initialization: Promise<void> | undefined;
export function initializeDb() {
  initialization ??= migrate().catch(error => { initialization=undefined; throw error; });
  return initialization;
}
async function migrate() {
  const db=getDb();
  const sql=await readFile(path.join(process.cwd(),'migrations/001.sql'),'utf8');
  const tx=await db.transaction('write');
  try {
    await tx.executeMultiple(sql);
    const marker=await tx.execute("SELECT id FROM schema_migrations WHERE id='001-demo'");
    if (!marker.rows.length) {
      for(const s of [ ['corte','Corte','Servicio de ejemplo: corte de cabello con acabado y definición.',30], ['barba','Arreglo de barba','Servicio de ejemplo: forma, contornos y cuidado de la barba.',20], ['corte-y-barba','Corte y barba','Servicio de ejemplo: corte de cabello y arreglo de barba en una cita.',50] ]) {
        await tx.execute({sql:'INSERT OR IGNORE INTO services(id,name,description,duration,active) VALUES(?,?,?,?,1)',args:s});
      }
      for(let day=1;day<=6;day++) await tx.execute({sql:'INSERT OR IGNORE INTO availability_rules(id,weekday,start_time,end_time,timezone,resource) VALUES(?,?,?,?,?,?)',args:[`demo-${day}`,day,'10:00','18:00','Europe/Madrid','silla-1']});
      await tx.execute("INSERT INTO schema_migrations(id) VALUES('001-demo')");
    }
    await tx.commit();
  } catch(e) { await tx.rollback(); throw e; } finally { tx.close(); }
}
