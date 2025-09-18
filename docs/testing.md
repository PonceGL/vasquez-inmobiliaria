# Guía de Testing con Jest y React Testing Library

Este documento explica cómo están estructurados los tests en el proyecto, las herramientas utilizadas y cómo ejecutarlos.

📜 Filosofía de Testing
Nuestro enfoque se centra en probar la aplicación de la misma manera que lo haría un usuario final. Para ello, utilizamos:

Jest: Como el framework de testing y ejecutor de pruebas.

React Testing Library: Para renderizar componentes e interactuar con ellos sin depender de los detalles de implementación.

📁 Estructura de Archivos (Colocada)
Hemos adoptado una estructura de tests colocados. Esto significa que cada archivo de prueba se encuentra en la misma carpeta que el archivo de código fuente que prueba.

Ejemplo de estructura:

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx  <-- Test para el componente Button
│
└── app/
    ├── layout.tsx
    ├── layout.test.tsx      <-- Test para el Layout
    ├── page.tsx
    └── page.test.tsx        <-- Test para la página principal
```

¿Por qué esta estructura?

Visibilidad: Es inmediato saber si un componente tiene tests.

Mantenimiento: Al modificar un componente, su test está al lado, facilitando su actualización.

Portabilidad: Si mueves un componente, te llevas su test consigo.

⚙️ Archivos de Configuración
jest.config.mjs: Configuración principal de Jest. Utiliza la base de next/jest para manejar la compilación de SWC y alias de ruta.

jest.setup.ts: Archivo que se ejecuta antes de cada suite de pruebas. Lo usamos para importar jest-dom y tener acceso a matchers personalizados como .toBeInTheDocument().

**mocks**/: Esta carpeta en la raíz contiene mocks globales para archivos que Jest no puede procesar, como hojas de estilo (.css) e imágenes (.png, .svg).

🚀 Cómo Ejecutar los Tests
Para correr todos los tests del proyecto, ejecuta el siguiente comando:

yarn test

Este comando ejecutará Jest, mostrará los resultados en la consola y generará un reporte de cobertura en la carpeta coverage/. Este reporte te indica qué porcentaje de tu código está cubierto por los tests.
