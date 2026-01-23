import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Copiar el logo a public/img si no existe
const logoSource = join(process.cwd(), 'img', 'Gemini_Generated_Image_2frb7c2frb7c2frb.png')
const logoDest = join(process.cwd(), 'public', 'img', 'Gemini_Generated_Image_2frb7c2frb7c2frb.png')
const logoDestDir = join(process.cwd(), 'public', 'img')

if (existsSync(logoSource) && !existsSync(logoDest)) {
  try {
    mkdirSync(logoDestDir, { recursive: true })
    copyFileSync(logoSource, logoDest)
    console.log('Logo copiado a public/img/')
  } catch (error) {
    console.warn('No se pudo copiar el logo automáticamente:', error.message)
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
})








// https://vite.dev/config/
// export default defineConfig({
//   // Base path solo para producción (GitHub Pages)
//   // En desarrollo, usar '/' para que las rutas funcionen normalmente
//   base: process.env.NODE_ENV === 'production' ? "/NeysanaPlussPB" : "/",
//   // https://JuanJ00Cr.github.io/NeysanaPlussPB
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
        
//       },
//     }),
//     tailwindcss(),
//   ],
// })

