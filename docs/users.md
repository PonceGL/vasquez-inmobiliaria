# Sistema de Usuarios

## Descripción General
El sistema de usuarios proporciona una gestión completa de usuarios con autenticación y roles, permitiendo controlar el acceso a diferentes funcionalidades de la aplicación.

## Características
- Gestión de usuarios (CRUD completo)
- Autenticación segura con contraseñas hasheadas
- Sistema de roles
- Validación de datos

## Roles Disponibles
- `admin`: Administrador del sistema
- `dev`: Desarrollador
- `collaborator`: Colaborador
- `editor`: Editor de contenido

## Endpoints de la API

### Obtener Todos los Usuarios
```http
GET /api/user
```
Retorna una lista de todos los usuarios registrados.

### Crear Usuario
```http
POST /api/user
```
Crea un nuevo usuario en el sistema.

**Cuerpo de la Petición:**
```json
{
  "name": "string",
  "email": "email@ejemplo.com",
  "password": "contraseña",
  "role": "admin|dev|collaborator|editor",
  "verified": boolean
}
```

### Obtener Usuario por ID
```http
GET /api/user/:id
```
Retorna los datos de un usuario específico.

### Actualizar Usuario
```http
PATCH /api/user/:id
```
Actualiza los datos de un usuario existente.

### Eliminar Usuario
```http
DELETE /api/user/:id
```
Elimina un usuario del sistema.

### Autenticación por Email
```http
POST /api/user/email/:email
```
Verifica las credenciales de un usuario.

**Cuerpo de la Petición:**
```json
{
  "password": "contraseña"
}
```

## Validaciones
- **Nombre**: Mínimo 3 caracteres
- **Email**: Debe ser un email válido y único en el sistema
- **Contraseña**: Mínimo 8 caracteres
- **Rol**: Debe ser uno de los roles válidos definidos
- **Verified**: Campo booleano requerido

## Seguridad
- Las contraseñas se almacenan de forma segura utilizando bcrypt
- El hash de las contraseñas incluye un salt único
- Las contraseñas nunca se devuelven en las respuestas de la API

## Respuestas de la API

### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Mensaje descriptivo",
  "data": { ... }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Mensaje de error",
  "data": null
}
```

## Códigos de Estado HTTP
- 200: Operación exitosa
- 201: Recurso creado exitosamente
- 400: Error de validación
- 409: Conflicto (ej: email duplicado)
- 500: Error interno del servidor