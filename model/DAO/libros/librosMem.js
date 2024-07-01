import ErrorNoDisponible from '../../../errores/ErrorNoDisponible.js'
import ErrorNoEncontrado from '../../../errores/ErrorNoEncontrado.js'

class ModelMem {
  constructor() {
    this.libros = []
  }

  obtener = async codigo => this.libros.find(x => x.codigo === codigo)

  agregar = async libro => {
    libro.estado = 'disponible'
    this.libros.push(libro)
    return libro
  }

  remover = async codigo => {
    const libro = await this.obtener(codigo)
    if (!libro) throw new ErrorNoEncontrado()

    const index = this.libros.indexOf(libro)
    if (index !== -1) this.libros.splice(index, 1)
    return libro
  }

  alquilar = async codigo => {
    const libro = await this.obtener(codigo)
    if (!libro) throw new ErrorNoEncontrado()
    if (libro.estado !== 'disponible') throw new ErrorNoDisponible()

    libro.estado = 'alquilado'
    return libro
  }

  devolver = async codigo => {
    const libro = await this.obtener(codigo)
    if (!libro) throw new ErrorNoEncontrado()
    if (libro.estado !== 'alquilado')
      throw new ErrorNoDisponible('No se puede devolver si no esta alquilado')

    libro.estado = 'disponible'
    return libro
  }

  marcarNoApto = async codigo => {
    const libro = await this.obtener(codigo)
    if (!libro) throw new ErrorNoEncontrado()

    libro.estado = 'no-apto'
    return libro
  }

  listarTodos = async () => this.libros

  listarPorEstado = async estado => this.libros.filter(x => x.estado === estado)
}

export default ModelMem
