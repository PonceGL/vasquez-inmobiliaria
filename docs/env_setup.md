# Configuración de Variables de Entorno

## Archivo .env Requerido

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
# ===========================================
# CONFIGURACIÓN DE LA APLICACIÓN NEXT.JS
# ===========================================

# Google Analytics 4 - ID de medición (OBLIGATORIO)
# Obtén este ID desde la consola de Google Analytics
# Formato: G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-ABC123DEF4

# ===========================================
# CONFIGURACIÓN DE BASE DE DATOS MONGODB
# ===========================================

# URI de conexión a MongoDB
# Formato: mongodb://usuario:contraseña@host:puerto/nombre_db
MONGODB_URI=mongodb://localhost:27017/test-app

# ===========================================
# CONFIGURACIÓN DE AUTENTICACIÓN
# ===========================================

# Clave secreta para firmar JWT
# Genera una clave segura de al menos 32 caracteres
SESSION_SECRET=tu_clave_secreta_muy_larga_y_segura_aqui_123456789

# ===========================================
# CONFIGURACIÓN DE DOCKER COMPOSE
# ===========================================

# PostgreSQL Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña_postgres_aqui
POSTGRES_DB=test_app_db

# MongoDB
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=tu_contraseña_mongo_aqui

# N8N Configuration
GENERIC_TIMEZONE=America/Mexico_City
TZ=America/Mexico_City

# ===========================================
# CONFIGURACIÓN DE N8N WORKFLOWS
# ===========================================

# SMTP - Envío de correos electrónicos
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_contraseña_de_aplicacion

# Google Gemini - Inteligencia Artificial
GEMINI_API_KEY=tu_api_key_de_gemini

# ===========================================
# CONFIGURACIÓN OPCIONAL
# ===========================================

# Node.js TLS (para desarrollo local)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Instrucciones de Configuración

### 1. Crear el archivo .env

```bash
# En la raíz del proyecto
touch .env
```

### 2. Copiar y personalizar las variables

1. Copia el contenido del bloque de código anterior
2. Pega en tu archivo `.env`
3. Reemplaza todos los valores de ejemplo con tus valores reales

### 3. Variables Obligatorias

#### NEXT_PUBLIC_GA_ID (OBLIGATORIO)

- **Propósito**: ID de medición de Google Analytics 4
- **Cómo obtenerlo**:
  - Ve a [Google Analytics](https://analytics.google.com)
  - Crea o selecciona una propiedad
  - Busca "ID de medición" en la configuración
  - Copia el ID que comienza con "G-"
- **Formato**: `G-XXXXXXXXXX`
- **Documentación completa**: [Analitycs](/docs/analitycs.md)

#### MONGODB_URI (OBLIGATORIO)

- **Propósito**: Conexión a la base de datos MongoDB
- **Formato**: `mongodb://localhost:27017/test-app`
- **Nota**: Para desarrollo local, usa la URI por defecto

#### SESSION_SECRET (OBLIGATORIO)

- **Propósito**: Clave para firmar tokens JWT
- **Requisitos**:
  - Mínimo 32 caracteres
  - Debe ser único y seguro
  - No compartir en repositorios públicos
- **Generar clave segura**:
  ```bash
  # Usando OpenSSL
  openssl rand -base64 32
  ```

### 4. Variables de N8N (Para automatización)

#### SMTP (Envío de correos)

- **SMTP_HOST**: Servidor SMTP (ej: smtp.gmail.com)
- **SMTP_PORT**: Puerto SMTP (ej: 587)
- **SMTP_USER**: Email para envío
- **SMTP_PASSWORD**: Contraseña de aplicación (no la contraseña normal)

**Para Gmail:**

1. Habilita autenticación de 2 factores
2. Genera contraseña de aplicación en [Google Security](https://myaccount.google.com/security)
3. Usa esa contraseña como `SMTP_PASSWORD`

#### Google Gemini (IA)

- **GEMINI_API_KEY**: API key de Google Gemini

**Cómo obtenerla:**

1. Ve a [Google AI Studio](https://aistudio.google.com/)
2. Crea una API key
3. Copia la clave generada

### 5. Variables de Docker (Opcionales para desarrollo)

Si solo quieres ejecutar la aplicación sin Docker, puedes omitir las variables de PostgreSQL y MongoDB, pero necesitarás una instancia de MongoDB ejecutándose.

### 5. Verificar la configuración

```bash
# Verificar que el archivo existe
ls -la .env

# Verificar que las variables están configuradas (sin mostrar valores)
grep -E "^[A-Z_]+=" .env | cut -d'=' -f1
```

## Valores de Ejemplo para Desarrollo

```bash
# Para desarrollo local rápido
NEXT_PUBLIC_GA_ID=G-ABC123DEF4
MONGODB_URI=mongodb://localhost:27017/test-app
SESSION_SECRET=desarrollo_local_secreto_123456789_abcdef
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=test_app_db
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=admin123
GENERIC_TIMEZONE=America/Mexico_City
TZ=America/Mexico_City
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Seguridad

### ⚠️ Importante

- **NUNCA** commits el archivo `.env` al repositorio
- **NUNCA** compartas las claves secretas
- **SIEMPRE** usa claves diferentes para desarrollo y producción
- **ROTA** las claves regularmente en producción

### Archivos ignorados

El archivo `.env` está incluido en `.gitignore` para evitar commits accidentales:

```gitignore
# env files (can opt-in for committing if needed)
.env*
```

## Troubleshooting

### Error: "Por favor, define la variable de entorno MONGODB_URI"

- Verifica que el archivo `.env` existe
- Verifica que `MONGODB_URI` está definida
- Verifica que no hay espacios extra en la definición

### Error: "Failed to verify session"

- Verifica que `SESSION_SECRET` está definida
- Verifica que la clave tiene al menos 32 caracteres
- Regenera la clave si es necesario

### Google Analytics no funciona

- Verifica que `NEXT_PUBLIC_GA_ID` está definida
- Verifica que el ID comienza con "G-"
- Consulta [Analitycs](/docs/analitycs.md) para configuración completa

## Recursos Adicionales

- [Documentación de Next.js - Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Google Analytics 4 - Configuración](https://developers.google.com/analytics/devguides/collection/ga4)
- [MongoDB - Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/)
