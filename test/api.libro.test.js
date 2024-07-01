import { expect } from 'chai'
import supertest from 'supertest'
import Server from '../server.js'
import config from '../config.js'

describe('Test /api/libros', () => {
  let server
  let app
  let request

  before(async () => {
    server = new Server(config.PORT)
    app = await server.start()
    request = supertest(app)
  })

  after(async () => {
    await server.stop()
  })

  describe('POST /api/libros', () => {
    it('debe agregar un libro y devolver el libro agregado', async () => {
      const libro = {
        codigo: '1234',
        titulo: 'El Quijote',
        autor: 'Miguel de Cervantes'
      }

      const response = await request.post('/api/libros').send(libro).expect(200)

      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('codigo', libro.codigo)
      expect(response.body).to.have.property('titulo', libro.titulo)
      expect(response.body).to.have.property('autor', libro.autor)
      expect(response.body).to.have.property('estado', 'disponible')
    })
  })
})
