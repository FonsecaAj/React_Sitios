import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/marcas-api': {
        target: 'https://tiusr25pl.cuc-carrera-ti.ac.cr',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/marcas-api/, '/MarcasInconsistencias')
      },
      '/proc1-api': {
        target: 'https://tiusr25pl.cuc-carrera-ti.ac.cr',
        changeOrigin: true,
        secure: false,
        rewrite: path =>
          path.replace(/^\/proc1-api/, '/apiproc1/api/proc1')
      }
    }
  }
})
