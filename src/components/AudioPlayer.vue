<template>
  <div>
    <audio ref="audio" controls :src="src"></audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: { src: { type: String, required: true } },
  mounted() {
    // Définir les métadonnées quand l’utilisateur a déclenché la lecture
    const audio = this.$refs.audio
    const setMeta = () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Titre démo', artist: 'Artiste', album: 'Album'
        })
      }
      audio.removeEventListener('play', setMeta)
    }
    audio.addEventListener('play', setMeta, { once: true })
  }
}
</script>
