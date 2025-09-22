import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar archivos next.config.js y .env en tu entorno de prueba
  dir: './',
})
 
// Agrega cualquier configuración personalizada de Jest que desees aquí
/** @type {import('jest').Config} */
const config = {
  // Indica que el entorno de prueba será jsdom (simulando un navegador)
  testEnvironment: 'jest-environment-jsdom',
  
  // Una lista de rutas a módulos que ejecutan código para configurar el framework de pruebas antes de cada test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Un mapa de expresiones regulares a nombres de módulos para simular recursos
  moduleNameMapper: {
    // Maneja los Módulos CSS (con Módulos CSS)
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
 
    // Maneja los Módulos CSS (CSS global)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',
 
    // Maneja imágenes y otros assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.ts`,

    // Maneja los alias de ruta de Next.js (si usas `src` o rutas personalizadas)
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Ignora las transformaciones para node_modules, excepto para los paquetes que son ESM puros
  transformIgnorePatterns: [
    '/node_modules/(?!(jose)/).*/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
 
// createJestConfig es una función asíncrona, por lo que debes exportar de esta manera
// envuelve tu configuración y se asegura de que `transform` se complete correctamente
export default createJestConfig(config)
