import express from 'express'
import config from './config.js'
import Router from './router/libros.js'

const PORT = config.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/libros', new Router().config())

const server = app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
)
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
