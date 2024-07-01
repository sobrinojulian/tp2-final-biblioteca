import express from 'express'
import Router from './router/libros.js'

class Server {
  constructor(port) {
    this.port = port
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use('/api/libros', new Router().config())
  }

  async start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`)
    })

    this.server.on('error', error => {
      console.log(`Error en servidor: ${error.message}`)
    })

    return this.app
  }

  async stop() {
    this.server.close()
  }
}

export default Server
