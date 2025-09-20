# API de Gestión de Imágenes - Sistema Inmobiliario

## Resumen

Esta API REST permite gestionar imágenes de propiedades inmobiliarias utilizando **Cloudinary** para el almacenamiento en la nube y **MongoDB** para el almacenamiento de metadatos. El sistema está diseñado para ser escalable, seguro y fácil de mantener.

## Arquitectura del Sistema

```
Cliente → API Routes → Services → Cloudinary/MongoDB
```

### Componentes Principales

- **API Routes**: Endpoints REST en `/api/image`
- **Services**: Lógica de negocio en `image.services.ts`
- **Cloudinary Service**: Gestión de archivos en la nube
- **MongoDB**: Almacenamiento de metadatos
- **Validación**: DTOs con Zod para consistencia de datos

## Endpoints Disponibles

### 1. Obtener Todas las Imágenes

```http
GET /api/image
```

**Respuesta:**

```json
{
  "success": true,
  "message": "Images successfully obtained",
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "url": "https://res.cloudinary.com/...",
      "asset_id": "abc123def456",
      "public_id": "propiedades/casa-1",
      "folder": "propiedades",
      "alt": "Casa moderna en venta",
      "width": 1920,
      "height": 1080
    }
  ]
}
```

### 2. Crear Nueva Imagen

```http
POST /api/image
Content-Type: multipart/form-data
```

**Body (FormData):**

- `file`: Archivo de imagen
- `alt`: Texto alternativo (opcional)
- `folder`: Carpeta de destino (opcional)

**Respuesta:**

```json
{
  "success": true,
  "message": "Imagen creada exitosamente",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "url": "https://res.cloudinary.com/...",
    "asset_id": "abc123def456",
    "public_id": "propiedades/casa-1",
    "folder": "propiedades",
    "alt": "Casa moderna en venta",
    "width": 1920,
    "height": 1080
  }
}
```

### 3. Obtener Imagen por ID

```http
GET /api/image/{id}
```

### 4. Actualizar Imagen

```http
PATCH /api/image/{id}
Content-Type: application/json
```

**Body:**

```json
{
  "alt": "Nuevo texto alternativo",
  "folder": "nueva-carpeta"
}
```

### 5. Eliminar Imagen

```http
DELETE /api/image/{id}
```

## Flujo de Trabajo

### Subida de Imagen

1. **Cliente envía FormData** con archivo y metadatos
2. **API valida** los datos usando DTOs de Zod
3. **Cloudinary Service** sube el archivo usando Upload Preset
4. **MongoDB** almacena los metadatos retornados por Cloudinary
5. **Respuesta** con la imagen creada

```typescript
// Ejemplo de uso en el frontend
const formData = new FormData();
formData.append("file", imageFile);
formData.append("alt", "Descripción de la imagen");
formData.append("folder", "propiedades");

const response = await fetch("/api/image", {
  method: "POST",
  body: formData,
});
```

### Eliminación de Imagen

1. **API busca** la imagen en MongoDB por ID
2. **Cloudinary Service** elimina el archivo usando `asset_id`
3. **MongoDB** elimina el registro
4. **Respuesta** de confirmación

## Estructura de Datos

### Modelo de Imagen (MongoDB)

```typescript
interface IImage {
  url: string; // URL de la imagen en Cloudinary
  asset_id: string; // ID único interno de Cloudinary
  public_id: string; // ID público de la imagen
  folder: string; // Carpeta donde se almacena
  alt: string; // Texto alternativo
  width: number; // Ancho en píxeles
  height: number; // Alto en píxeles
}
```

### Respuesta de Cloudinary

```typescript
interface UploadImageSuccess {
  asset_id: string;
  public_id: string;
  url: string;
  secure_url: string;
  folder: string;
  width: number;
  height: number;
  // ... más metadatos
}
```

## Organización por Carpetas

### Estructura Recomendada

```
propiedades/
├── casas/
├── departamentos/
├── terrenos/
└── comerciales/
```

### Configuración

- **Carpeta base**: Definida en `CLOUDINARY_FOLDER`
- **Subcarpetas**: Especificadas en el campo `folder` del FormData
- **Ruta final**: `${CLOUDINARY_FOLDER}/${folder}`

## Validaciones

### DTOs de Validación

- **`uploadImageDto`**: Valida FormData de subida
- **`createImageDto`**: Valida datos para MongoDB
- **`updateImageDto`**: Valida datos de actualización

### Reglas de Validación

- **Archivo**: Requerido para subida
- **Alt text**: Mínimo 5 caracteres
- **URL**: Debe ser válida
- **Dimensiones**: Números positivos

## Manejo de Errores

### Códigos de Estado HTTP

- **200**: Operación exitosa
- **201**: Imagen creada
- **202**: Imagen actualizada/eliminada
- **400**: Datos inválidos
- **404**: Imagen no encontrada
- **500**: Error interno del servidor

### Respuestas de Error

```json
{
  "message": "Descripción del error",
  "errors": [
    {
      "field": "alt",
      "message": "El texto alternativo debe tener al menos 5 caracteres"
    }
  ]
}
```

## Variables de Entorno Requeridas

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
CLOUDINARY_FOLDER=propiedades
CLOUDINARY_PRESET=tu_upload_preset

# MongoDB
MONGODB_URI=mongodb://localhost:27017/vasquez-inmobiliaria
```

## Consideraciones de Seguridad

1. **Upload Presets**: Configurados para subidas no firmadas
2. **Validación**: Todos los datos se validan con Zod
3. **Autenticación**: Basic Auth para Cloudinary Admin API
4. **Carpetas**: Organización centralizada para control de acceso

## Uso en el Frontend

### Ejemplo con React

```typescript
const uploadImage = async (file: File, alt: string, folder: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("alt", alt);
  formData.append("folder", folder);

  try {
    const response = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir imagen");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
```

## Mantenimiento

### Logs y Monitoreo

- Errores de Cloudinary se registran en consola
- Validaciones fallidas retornan detalles específicos
- Conexiones a MongoDB se cachean para optimización

### Escalabilidad

- Cloudinary maneja el almacenamiento y CDN
- MongoDB puede escalarse horizontalmente
- API diseñada para manejar múltiples requests concurrentes

---

**Nota**: Para más detalles sobre la configuración de Cloudinary, consulta `docs/cloudinary.md`.
