class ErrorNoEncontrado extends Error {
  constructor(message) {
    super(message || 'Recurso no encontrado')
    this.name = 'ErrorNoEncontrado'
  }
}

export default ErrorNoEncontrado
