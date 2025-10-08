<script>
export default {
  name: 'InstallButton',
  data() {
    return {
      canInstall: false,
      _deferred: null
    }
  },
  methods: {
    async install() {
      if (!this._deferred) return
      this._deferred.prompt()
      await this._deferred.userChoice
      this._deferred = null
      this.canInstall = false
    },
    _onBeforeInstall(e) {
      e.preventDefault()
      this._deferred = e
      this.canInstall = true
    }
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', this._onBeforeInstall)
  },
  unmounted() {
    window.removeEventListener('beforeinstallprompt', this._onBeforeInstall)
  }
}
</script>

<template>
  <button v-if="canInstall" @click="install">Installer l’app</button>
</template>

<style scoped>
button { padding:.7rem 1rem; border-radius:.75rem; }
</style>
