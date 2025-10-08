import { openDB } from 'idb'

export const dbp = openDB('media-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('tracks')) {
      db.createObjectStore('tracks', { keyPath: 'id' })
    }
  }
})

export async function addTrack(track) {
  const db = await dbp
  return db.put('tracks', track) // {id, title, blobUrl, ...}
}

export async function listTracks() {
  const db = await dbp
  return db.getAll('tracks')
}
