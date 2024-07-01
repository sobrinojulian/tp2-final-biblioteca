import ModelMem from './librosMem.js'

class ModelFactory {
  static get(tipo) {
    switch (tipo) {
      case 'MEM':
        console.log('Productos Persistiendo en Memoria')
        return new ModelMem()
      default:
        console.log('Productos Persistiendo en Memoria (default)')
        return new ModelMem()
    }
  }
}

export default ModelFactory
