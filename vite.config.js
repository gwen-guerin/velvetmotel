import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const GALLERY_DIR = fileURLToPath(new URL('./public/assets/gallery', import.meta.url))
const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i

// Le dossier public/ n'est pas traité par Vite : import.meta.glob ne peut donc
// pas le lister. Ce plugin lit public/assets/gallery au démarrage du serveur et
// au build, et expose les URLs via le module virtuel 'virtual:gallery'.
// Concrètement : déposer une image dans le dossier suffit à l'ajouter au site.
function galleryPlugin() {
  const virtualId = 'virtual:gallery'
  const resolvedId = '\0' + virtualId

  return {
    name: 'velvet-gallery',

    resolveId(id) {
      return id === virtualId ? resolvedId : null
    },

    load(id) {
      if (id !== resolvedId) return null
      const files = fs.existsSync(GALLERY_DIR)
        ? fs.readdirSync(GALLERY_DIR).filter((f) => IMAGE_RE.test(f)).sort()
        : []
      const urls = files.map((f) => `/assets/gallery/${encodeURIComponent(f)}`)
      return `export const galleryUrls = ${JSON.stringify(urls)}\n`
    },

    // En dev : recharge la page quand une photo est ajoutée ou supprimée.
    configureServer(server) {
      server.watcher.add(GALLERY_DIR)
      const refresh = (file) => {
        if (!file.startsWith(GALLERY_DIR) || !IMAGE_RE.test(file)) return
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), galleryPlugin()],
})
