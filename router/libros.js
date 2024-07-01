import express from 'express'
import Controlador from '../controlador/libros.js'

class Router {
  constructor() {
    this.router = express.Router()
    this.controlador = new Controlador()
  }

  config() {
    // Alta
    this.router.post('/', this.controlador.agregar)
    // Baja
    this.router.delete('/:codigo', this.controlador.remover)
    // Listar
    this.router.get('/', this.controlador.listarTodos)
    this.router.get('/disponibles', this.controlador.listarDisponibles)
    this.router.get('/alquilados', this.controlador.listarAlquilados)
    this.router.get('/no-aptos', this.controlador.listarNoAptos)
    // Alquilar, devolver o 'marcar como no apto'
    this.router.put('/:codigo/alquilar', this.controlador.alquilar)
    this.router.put('/:codigo/devolver', this.controlador.devolver)
    this.router.put('/:codigo/marcar-no-apto', this.controlador.marcarNoApto)

    return this.router
  }
}

export default Router
