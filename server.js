import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

// Servir archivos estáticos desde la carpeta public
app.use('/*', serveStatic({ root: './public' }))

const port = 3000

console.log(`🚀 Servidor iniciado en http://localhost:${port}`)
console.log('📚 Template del curso de APIs con Javascript')

serve({
  fetch: app.fetch,
  port
})