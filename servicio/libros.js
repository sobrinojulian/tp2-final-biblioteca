import axios from 'axios'

import ModelFactory from '../model/DAO/libros/librosFactory.js'
import config from '../config.js'
import validar from './validaciones/libro.js'
import ErrorDeValidacion from '../errores/ErrorDeValidacion.js'

class Servicio {
  constructor() {
    this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
  }

  agregar = async libro => {
    const error = validar(libro)
    if (error) {
      const errorMsg = error.details.map(detail => detail.message).join(', ')
      throw new ErrorDeValidacion(errorMsg)
    }
    return await this.model.agregar(libro)
  }

  remover = async codigo => await this.model.remover(codigo)

  alquilar = async codigo => {
    const libro = await this.model.alquilar(codigo)

    try {
      const response = await axios.get('https://libros.deno.dev/premios')
      const { premio } = response.data
      console.log(premio)

      if (premio) {
        await this.model.remover(codigo)
        return {
          mensaje: '¡Felicidades! Ha ganado el premio.',
          libro
        }
      }
      return libro
    } catch (error) {
      console.error('Error al verificar premio:', error.message)
      throw new Error('Error al verificar premio.')
    }
  }
  devolver = async codigo => await this.model.devolver(codigo)

  marcarNoApto = async codigo => await this.model.marcarNoApto(codigo)

  listarTodos = async () => await this.model.listarTodos()

  listarPorEstado = async estado => await this.model.listarPorEstado(estado)
}

export default Servicio
