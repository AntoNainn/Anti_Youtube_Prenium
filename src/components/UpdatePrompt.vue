<template>
  <div v-if="needRefresh" class="update-banner">
    <span>Nouvelle version disponible</span>
    <button @click="doUpdate">Mettre à jour</button>
  </div>
</template>

<script>
import { registerSW } from 'virtual:pwa-register'

export default {
  name: 'UpdatePrompt',
  data() {
    return {
      needRefresh: false,
      _update: null,
      _timer: null
    }
  },
  methods: {
    doUpdate() {
      if (this._update) this._update(true) // true => skipWaiting + reload
    }
  },
  mounted() {
    const updateSW = registerSW({
      immediate: true, // enregistre/charge le SW tout de suite
      onNeedRefresh: () => {
        // Le nouveau SW est en "waiting"
        this.needRefresh = true
      },
      onOfflineReady: () => {
        // optionnel: l'app est prête pour offline
      }
    })
    // On garde une closure pour déclencher l'update
    this._update = updateSW

    // iOS ne “poll” pas souvent : on vérifie régulièrement
    this._timer = setInterval(() => updateSW(), 30 * 1000) // 30s pour test
  },
  unmounted() {
    clearInterval(this._timer)
  }
}
</script>

<style scoped>
.update-banner {
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: 1rem; display: flex; gap: .75rem; align-items: center;
  background: #111; color: #fff; padding: .75rem 1rem;
  border-radius: .75rem; box-shadow: 0 8px 24px rgba(0,0,0,.25);
}
button { padding: .5rem .75rem; border-radius: .5rem; }
</style>
