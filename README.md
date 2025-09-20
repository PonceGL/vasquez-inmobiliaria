# Vasquez Inmobiliaria

Éste proyecto genera la página web con Dashboard de administración para la inmobiliaria Vazquez

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js 18+](https://nodejs.org/es/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) o npm
- [Docker y Docker Compose](https://www.docker.com/)

### Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone git@github.com:PonceGL/vasquez-inmobiliaria.git
   cd vasquez-inmobiliaria
   ```

2. **Configurar variables de entorno**:

   # Ver sección **Variables de Entorno** más abajo

3. **Instalar dependencias**:

   ```bash
   yarn install
   ```

4. **Iniciar servicios**:

   ```bash
   # Iniciar MongoDB, PostgreSQL y N8N
   docker-compose up -d
   ```

5. **Ejecutar la aplicación**:

   ```bash
   yarn dev
   ```

6. **Acceder a la aplicación**:
   - Aplicación: http://localhost:3000
   - N8N: http://localhost:5678

## 📋 Variables de Entorno Requeridas

Reviza el archivo [Configuración de Variables de Entorno](/docs/git-crypt.md)

## 📚 Documentación

- **[Documentación Técnica Completa](/docs/README.md)** - Guía detallada del proyecto
- **[Configuración de Variables de Entorno](/docs/git-crypt.md)** - Setup completo del archivo .env
- **[Configuración de Google Analytics](/docs/analitycs.md)** - Setup de GA4
- **[Configuración de N8N](/docs/n8n_setup.md)** - Automatización y workflows
- **[API de Gestión de Imágenes](/docs/api-images.md)** - Sistema completo de gestión de imágenes con Cloudinary
- **[Integración con Cloudinary](/docs/cloudinary.md)** - Configuración y estrategia de subida de archivos

## 🛠️ Scripts Disponibles

```bash
yarn dev          # Servidor de desarrollo
yarn build        # Construir para producción
yarn start        # Servidor de producción
yarn lint         # Ejecutar linter
yarn test         # Ejecutar tests
```

## 🏗️ Stack Tecnológico

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **MongoDB** - Base de datos principal
- **PostgreSQL** - Base de datos para N8N
- **Cloudinary** - Gestión de imágenes y archivos multimedia
- **Google Analytics 4** - Análisis
- **N8N** - Automatización
- **Docker** - Contenedores

## 🔧 Funcionalidades

- ✅ Autenticación con JWT
- ✅ Gestión de propiedades inmobiliarias
- ✅ **Gestión de Imágenes** - API REST para subir, organizar y gestionar imágenes con Cloudinary
- ✅ Google Analytics integrado
- ✅ Panel de administración
- ✅ APIs RESTful
- ✅ **Automatización con N8N** - Respuestas automáticas con IA
- ✅ **Workflow de formularios** - Análisis inteligente de mensajes
- ✅ Responsive design

## 🐛 Troubleshooting

### Error: "Por favor, define la variable de entorno MONGODB_URI"

- Verifica que el archivo `.env` existe y contiene `MONGODB_URI`

### Google Analytics no funciona

- Verifica que `NEXT_PUBLIC_GA_ID` esté configurado correctamente
- Consulta [Analitycs](/docs/Analitycs.md)

### Error de conexión a base de datos

- Asegúrate de que Docker esté ejecutándose: `docker-compose up -d`
- Verifica que los servicios estén activos: `docker-compose ps`

### Error al subir imágenes

- Verifica que las variables de entorno de Cloudinary estén configuradas correctamente
- Consulta [API de Gestión de Imágenes](/docs/api-images.md) para configuración detallada
- Revisa [Integración con Cloudinary](/docs/cloudinary.md) para setup del Upload Preset

### ⚙️ Configuraciones y Estándares del Proyecto

Este proyecto está configurado con un conjunto de herramientas para automatizar la calidad del código, asegurar la consistencia y mantener un historial de cambios limpio y legible. Estas configuraciones están diseñadas para funcionar de forma automática, requiriendo una configuración inicial nula por parte del desarrollador y facilitando el cumplimiento de los estándares definidos.

Para entender en detalle cómo funciona cada herramienta y cuáles son nuestras convenciones, por favor consulta las siguientes guías:

[Guía de Commits](/docs/commits.md) (commitlint y husky): Explica cómo formatear tus mensajes de commit y el flujo de validación automática.

[Guía de ESLint](/docs/eslint.md): Detalla nuestras reglas de estilo de código y cómo funciona el formateo automático al guardar.

[Guía de Testing](/docs/testing.md): Describe nuestra estrategia de pruebas, la estructura de los archivos de test y cómo ejecutarlos.
