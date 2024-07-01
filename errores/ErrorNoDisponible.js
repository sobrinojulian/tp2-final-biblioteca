class ErrorNoDisponible extends Error {
  constructor(message) {
    super(message || 'Recurso no disponible')
    this.name = 'ErrorNoDisponible'
  }
}

export default ErrorNoDisponible
