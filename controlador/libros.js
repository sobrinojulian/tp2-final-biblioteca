import Servicio from '../servicio/libros.js'
import ErrorDeValidacion from '../errores/ErrorDeValidacion.js'
import ErrorNoEncontrado from '../errores/ErrorNoEncontrado.js'
import ErrorNoDisponible from '../errores/ErrorNoDisponible.js'

class Controlador {
  constructor() {
    this.servicio = new Servicio()
  }

  agregar = async (req, res) => {
    try {
      const libro = await this.servicio.agregar(req.body)
      res.json(libro)
    } catch (error) {
      if (error instanceof ErrorDeValidacion) {
        res.status(400).json({ errorMsg: error.message })
      } else {
        res.status(500).json({ errorMsg: 'Error interno del servidor.' })
      }
    }
  }

  remover = async (req, res) => {
    try {
      const { codigo } = req.params
      const libro = await this.servicio.remover(codigo)
      res.json(libro)
    } catch (error) {
      if (error instanceof ErrorNoEncontrado) {
        res.status(404).json({ errorMsg: error.message })
      } else {
        res.status(500).json({ errorMsg: 'Error interno del servidor.' })
      }
    }
  }

  alquilar = async (req, res) => {
    try {
      const { codigo } = req.params
      const libro = await this.servicio.alquilar(codigo)
      res.json(libro)
    } catch (error) {
      if (error instanceof ErrorNoEncontrado) {
        res.status(404).json({ errorMsg: error.message })
      } else if (error instanceof ErrorNoDisponible) {
        res.status(409).json({ errorMsg: error.message })
      } else {
        res.status(500).json({ errorMsg: 'Error interno del servidor.' })
      }
    }
  }

  devolver = async (req, res) => {
    try {
      const { codigo } = req.params
      const libro = await this.servicio.devolver(codigo)
      res.json(libro)
    } catch (error) {
      if (error instanceof ErrorNoEncontrado) {
        res.status(404).json({ errorMsg: error.message })
      } else if (error instanceof ErrorNoDisponible) {
        res.status(409).json({ errorMsg: error.message })
      } else {
        res.status(500).json({ errorMsg: 'Error interno del servidor.' })
      }
    }
  }

  marcarNoApto = async (req, res) => {
    try {
      const { codigo } = req.params
      const libro = await this.servicio.marcarNoApto(codigo)
      res.json(libro)
    } catch (error) {
      if (error instanceof ErrorNoEncontrado) {
        res.status(404).json({ errorMsg: error.message })
      } else {
        res.status(500).json({ errorMsg: 'Error interno del servidor.' })
      }
    }
  }

  listarTodos = async (req, res) => {
    try {
      const libros = await this.servicio.listarTodos()
      res.json(libros)
    } catch (error) {
      res.status(500).json({ errorMsg: 'Error interno del servidor.' })
    }
  }

  listarDisponibles = async (req, res) => {
    const estado = 'disponible'
    try {
      const libros = await this.servicio.listarPorEstado(estado)
      res.json(libros)
    } catch (error) {
      res.status(500).json({ errorMsg: 'Error interno del servidor.' })
    }
  }

  listarAlquilados = async (req, res) => {
    const estado = 'alquilado'
    try {
      const libros = await this.servicio.listarPorEstado(estado)
      res.json(libros)
    } catch (error) {
      res.status(500).json({ errorMsg: 'Error interno del servidor.' })
    }
  }

  listarNoAptos = async (req, res) => {
    const estado = 'no-apto'
    try {
      const libros = await this.servicio.listarPorEstado(estado)
      res.json(libros)
    } catch (error) {
      res.status(500).json({ errorMsg: 'Error interno del servidor.' })
    }
  }
}

export default Controlador
