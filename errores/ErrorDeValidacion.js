class ErrorDeValidacion extends Error {
  constructor(message) {
    super(message || 'Error de validación')
    this.name = 'ErrorDeValidacion'
  }
}

export default ErrorDeValidacion
