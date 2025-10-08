<template>
  <div v-if="visible" class="toast">
    <span>Nouvelle version disponible</span>
    <button @click="refresh">Mettre à jour</button>
  </div>
</template>

<script>
export default {
  name: 'UpdateToast',
  data: () => ({ visible: false, action: null }),
  methods: {
    show(cb) { this.action = cb; this.visible = true },
    refresh() { if (this.action) this.action() }
  }
}
</script>

<style scoped>
.toast {
  position: fixed; left: 0; right: 0; bottom: 1rem;
  margin: 0 auto; width: fit-content; max-width: 90vw;
  display: flex; gap: .75rem; align-items: center;
  padding: .75rem 1rem; border-radius: .75rem;
  background: #111; color: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
}
button { padding: .5rem .75rem; border-radius: .5rem; }
</style>
