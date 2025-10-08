import { registerSW } from 'virtual:pwa-register'

// Affiche un callback quand une nouvelle version est prête
export const setupPWAUpdater = (onNeedRefresh) => {
  // checkUpdate: vérifie régulièrement (ici toutes les 20 min)
  const updateSW = registerSW({
    immediate: true,                 // enregistre le SW tout de suite
    onNeedRefresh() {
      // Le nouveau SW est en "waiting" → propose une mise à jour
      onNeedRefresh(() => updateSW(true))  // true => skipWaiting + reload
    },
    onOfflineReady() {
      // Optionnel: l'app est prête pour l'offline
    }
  })

  // Optionnel: vérifie périodiquement
  setInterval(() => updateSW(), 20 * 60 * 1000)
}
