# Documentación de Integración con Cloudinary

Este documento describe la estrategia y el flujo de trabajo para la gestión de archivos multimedia (imágenes, videos, etc.) utilizando el servicio de Cloudinary.

## Resumen de la Estrategia

Para simplificar el proceso de subida de archivos y evitar la complejidad de generar firmas de seguridad en el lado del cliente o del servidor, hemos adoptado un método de **subidas no firmadas (unsigned uploads)**. Esto se logra a través de una funcionalidad de Cloudinary llamada **Upload Presets**.

Esta aproximación nos permite tener un control centralizado sobre cómo se suben y procesan los archivos, mejorando la seguridad y la mantenibilidad.

---

## 1. El Problema con las Subidas Firmadas

El método de subida por defecto de Cloudinary requiere una "firma" (`signature`) que se genera dinámicamente utilizando el `api_secret`. Este proceso implica:

1.  Crear una cadena de texto con todos los parámetros de la subida, ordenados alfabéticamente.
2.  Añadir el `api_secret` a esta cadena.
3.  Generar un hash SHA-1.

Implementar esto de forma segura puede ser complejo y propenso a errores, especialmente si se intenta replicar fuera de los SDK oficiales de Cloudinary. Las pruebas iniciales con este método no fueron exitosas y añadían una capa innecesaria de complejidad.

---

## 2. La Solución: Upload Presets

La solución es utilizar un **Upload Preset** configurado para permitir subidas no firmadas.

### ¿Qué es un Upload Preset?

Es una configuración centralizada en tu cuenta de Cloudinary que define un conjunto de opciones que se aplicarán a todos los archivos subidos con ese preset.

### ¿Cómo crearlo? (Método recomendado)

La forma más sencilla es a través de la plataforma web de Cloudinary:

1.  Ve a **Settings (⚙️) > Upload**.
2.  Baja a la sección **Upload Presets** y haz clic en **"Add upload preset"**.
3.  Elige un nombre para tu preset (ej. `mi_app_unsigned`).
4.  La opción más importante: cambia **"Signing Mode"** de "Signed" a **"Unsigned"**.
5.  **Configura opciones adicionales**:
    - **Use asset folder**: Puedes definir una carpeta por defecto donde se guardarán los archivos.
    - **Allowed formats**: Limita los tipos de archivo permitidos (ej. `png`, `jpg`, `mp4`).
    - **Auto-tagging**: Aplica etiquetado automático basado en el contenido de la imagen.

Una vez creado el preset, solo necesitas su nombre para realizar las subidas.

---

## 3. Flujo de Trabajo Recomendado

### a. Organización con Carpetas (Folders)

Para mantener los recursos organizados, es fundamental usar carpetas. Antes de subir un archivo, se puede asegurar que la carpeta de destino exista.

- **Acción**: Crear/gestionar carpetas a través de la API.
- **Postman**: Los endpoints para CRUD de carpetas están en la colección.

### b. Subida de Archivos

La subida se realiza apuntando al endpoint de `upload` y pasando dos parámetros clave:

1.  `upload_preset`: El nombre del preset no firmado que creaste.
2.  `folder`: La ruta de la carpeta donde se guardará el recurso.

Con esto, no es necesario enviar el `api_key` ni una `signature`.

### c. Almacenamiento de Identificadores

Cuando un archivo se sube con éxito, la API de Cloudinary devuelve un objeto JSON con mucha información. Es **crítico** guardar al menos estos dos identificadores en nuestra base de datos, asociados al registro correspondiente:

- **`public_id`**: El identificador único del recurso, que incluye la ruta de la carpeta (ej. `mi_carpeta/mi_archivo_random`).
- **`asset_id`**: Un identificador inmutable interno de Cloudinary para ese recurso.

### d. Gestión de Recursos (Actualizar, Eliminar, Leer)

Todas las operaciones posteriores a la subida (leer detalles, actualizar metadatos, eliminar) se realizan a través de la **Admin API**. Estas llamadas sí requieren autenticación (API Key y API Secret) y se hacen utilizando el `public_id` o `asset_id` que guardamos previamente.

---

## 4. Uso de la Colección de Postman

Se ha preparado una colección de Postman (`Cloudinary.postman_collection.json`) que contiene todos los endpoints necesarios para implementar este flujo de trabajo:

- CRUD para Presets.
- CRUD para Carpetas.
- Subida de imágenes (usando el preset).
- Gestión de recursos por `public_id` y `asset_id`.

Para usarla, es necesario configurar un entorno en Postman con las siguientes variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_PRESET` (el nombre de tu preset no firmado)
- `CLOUDINARY_FOLDER` (una carpeta de ejemplo para las pruebas)

---

## 5. Enlaces de Referencia

- [Documentación de la Admin API](https://cloudinary.com/documentation/admin_api)
- [Subidas no autenticadas (unsigned)](https://cloudinary.com/documentation/upload_images#unauthenticated_requests)
- [Colección oficial de Postman de Cloudinary](https://cloudinary.com/documentation/using_cloudinary_postman_collections#run_a_collection)
