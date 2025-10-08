<template>
  <main>
    <h1>Anti Youtube Premium</h1>
    <InstallButton />
    <p>
      <input type="file"   accept="audio/*,.m4a,.mp3,.aac,.wav,.flac,.ogg" @change="importFile" />
    </p>
    <ul>
      <li v-for="t in tracks" :key="t.id">
        {{ t.title }}
        <AudioPlayer :src="t.blobUrl" />
      </li>
    </ul>
    <UpdateToast ref="updater" />
  </main>
</template>

<script>
import InstallButton from './components/InstallButton.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import { addTrack, listTracks } from './db'
import UpdateToast from './components/UpdateToast.vue';

export default {
  name: 'App',
  components: { InstallButton, AudioPlayer, UpdateToast },
  data() {
    return { 
      tracks: [] 
    }
  },
  methods: {
    async refresh() {
      this.tracks = await listTracks()
    },
    async importFile(e) {
      const file = e.target.files?.[0]
      if (!file) return
      const blobUrl = URL.createObjectURL(file)
      await addTrack({ id: crypto.randomUUID(), title: file.name, blobUrl })
      await this.refresh()
      // Persistance du stockage (si dispo)
      if (navigator.storage?.persist) navigator.storage.persist()
    }
  },
  async mounted() {
    await this.refresh()
    // Connecte le toast au cycle SW
    const comp = this.$refs.updater
    setupPWAUpdater((accept) => {
      // onNeedRefresh → afficher le toast; "accept" déclenche l’update
      comp.show(accept)
    })
  }
}
</script>

<style>
main { padding: 2rem; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
</style>

