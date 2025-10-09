# N8N - Configuración y Automatización

## Descripción General

N8N es una herramienta de automatización de workflows que permite conectar diferentes servicios y APIs sin necesidad de código. En este proyecto, N8N se utiliza para automatizar respuestas de formularios de contacto utilizando inteligencia artificial (Google Gemini) y envío de correos electrónicos.

## Variables de Entorno Requeridas

### Variables de Base de Datos

```bash
# MongoDB (para N8N)
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=tu_contraseña_mongo_aqui

# MongoDB URI (para la aplicación)
MONGODB_URI=mongodb://localhost:27017/test-app
```

### Variables de SMTP (Envío de Correos)

```bash
# Configuración SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_contraseña_de_aplicacion
```

### Variables de Google Gemini (IA)

```bash
# Google Gemini API
GEMINI_API_KEY=tu_api_key_de_gemini
```

## Cómo Obtener las Credenciales

### 1. Configuración de MongoDB

Las variables de MongoDB ya están configuradas en el `docker-compose.yml`:

```yaml
mongo:
  image: mongo
  environment:
    - MONGO_INITDB_ROOT_USERNAME=${MONGO_ROOT_USER}
    - MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}
```

**Valores recomendados para desarrollo:**

- `MONGO_ROOT_USER=admin`
- `MONGO_ROOT_PASSWORD=admin123` (cambiar en producción)

### 2. Configuración de SMTP

#### Gmail (Recomendado)

1. **Habilitar autenticación de 2 factores** en tu cuenta de Google
2. **Generar contraseña de aplicación**:
   - Ve a [Configuración de Google](https://myaccount.google.com/security)
   - Selecciona "Contraseñas de aplicaciones"
   - Genera una nueva contraseña para "Correo"
   - Usa esta contraseña como `SMTP_PASSWORD`

**Configuración para Gmail:**

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=contraseña_de_aplicacion_generada
```

#### Otros Proveedores SMTP

**Outlook/Hotmail:**

```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

**Yahoo:**

```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

**Servidor personalizado:**

```bash
SMTP_HOST=tu_servidor_smtp.com
SMTP_PORT=587
```

### 3. Configuración de Google Gemini

1. **Accede a Google AI Studio**:

   - Ve a [Google AI Studio](https://aistudio.google.com/)
   - Inicia sesión con tu cuenta de Google

2. **Crear una API Key**:

   - Haz clic en "Get API Key"
   - Selecciona "Create API Key"
   - Copia la clave generada

3. **Configurar la variable**:
   ```bash
   GEMINI_API_KEY=tu_api_key_aqui
   ```

## Workflow de Ejemplo

### Automatic Form Responses

El proyecto incluye un workflow de ejemplo en [n8n-workflows/Automatic_form_responses.json](../n8n-workflows/Automatic_form_responses.json) que automatiza las respuestas a formularios de contacto.

#### Funcionalidades del Workflow

1. **Recepción de datos** via webhook
2. **Filtrado** de emails corporativos
3. **Análisis de mensajes** con Google Gemini
4. **Clasificación automática** del tipo de mensaje
5. **Respuesta personalizada** por email
6. **Almacenamiento** en MongoDB

#### Flujo de Trabajo

```
Webhook → Filter → MongoDB Check → AI Analysis → Response Generation → Email Send
```

#### Tipos de Respuesta

- **thanks**: Mensaje de agradecimiento
- **help**: Solicitud de ayuda
- **question**: Pregunta específica
- **negativeComment**: Comentario negativo

## Configuración en N8N

### 1. Importar el Workflow

1. **Acceder a N8N**:

   - Ve a http://localhost:5678
   - Completa el setup inicial

2. **Importar workflow**:
   - Ve a "Workflows"
   - Haz clic en "Import from file"
   - Selecciona `n8n-workflows/Automatic_form_responses.json`

### 2. Configurar Credenciales

#### MongoDB Credentials

1. **Crear credencial**:
   - Ve a "Credentials" → "Add Credential"
   - Selecciona "MongoDB"
   - Configura:
     - **Host**: `mongo` (nombre del servicio Docker)
     - **Port**: `27017`
     - **Database**: `test-app`
     - **Username**: `${MONGO_ROOT_USER}`
     - **Password**: `${MONGO_ROOT_PASSWORD}`

#### SMTP Credentials

1. **Crear credencial**:
   - Ve a "Credentials" → "Add Credential"
   - Selecciona "SMTP"
   - Configura:
     - **Host**: `${SMTP_HOST}`
     - **Port**: `${SMTP_PORT}`
     - **Username**: `${SMTP_USER}`
     - **Password**: `${SMTP_PASSWORD}`
     - **Secure**: `true` (para puerto 587)

#### Google Gemini Credentials

1. **Crear credencial**:
   - Ve a "Credentials" → "Add Credential"
   - Busca "Google Gemini" o "Google PaLM"
   - Configura:
     - **API Key**: `${GEMINI_API_KEY}`

### 3. Activar el Workflow

1. **Abrir el workflow** importado
2. **Verificar conexiones** entre nodos
3. **Activar el workflow** con el toggle superior
4. **Copiar la URL del webhook** para usar en tu aplicación

## Integración con la Aplicación

### Webhook Endpoint

El workflow expone un webhook en:

```
POST http://localhost:5678/webhook/contact
```

### Datos Esperados

```json
{
  "name": "Nombre del usuario",
  "email": "usuario@email.com",
  "message": "Mensaje del usuario"
}
```

### Ejemplo de Uso

```javascript
// En tu aplicación Next.js
const response = await fetch("http://localhost:5678/webhook/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Juan Pérez",
    email: "juan@email.com",
    message: "Hola, tengo una pregunta sobre sus servicios",
  }),
});
```

## Personalización del Workflow

### Modificar Respuestas

1. **Abrir el nodo "Send email"**
2. **Editar el campo "text"**
3. **Personalizar las respuestas** según tus necesidades

### Agregar Nuevos Tipos de Mensaje

1. **Modificar el nodo "Message a model"**
2. **Actualizar el prompt** para incluir nuevos tipos
3. **Agregar casos** en el nodo "Switch"
4. **Crear respuestas** correspondientes

### Configurar Filtros

1. **Editar el nodo "Filter"**
2. **Modificar las condiciones** de filtrado
3. **Ajustar la lógica** según tus reglas de negocio

## Troubleshooting

### Error: "MongoDB connection failed"

- Verifica que MongoDB esté ejecutándose: `docker-compose ps`
- Revisa las credenciales de MongoDB
- Asegúrate de que la base de datos existe

### Error: "SMTP authentication failed"

- Verifica las credenciales SMTP
- Para Gmail, asegúrate de usar contraseña de aplicación
- Revisa que el puerto y host sean correctos

### Error: "Gemini API key invalid"

- Verifica que la API key sea correcta
- Asegúrate de que la API key tenga permisos
- Revisa que no haya espacios extra en la variable

### Webhook no responde

- Verifica que el workflow esté activo
- Revisa la URL del webhook
- Comprueba los logs de N8N

## Monitoreo y Logs

### Ver Logs de N8N

```bash
# Ver logs del contenedor
docker-compose logs n8n

# Seguir logs en tiempo real
docker-compose logs -f n8n
```

### Ver Ejecuciones

1. **En la interfaz de N8N**:
   - Ve a "Executions"
   - Revisa el estado de las ejecuciones
   - Analiza errores si los hay

## Recursos Adicionales

- [Documentación oficial de N8N](https://docs.n8n.io/)
- [N8N Nodes - MongoDB](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.mongoDb/)
- [N8N Nodes - SMTP](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.emailSend/)
- [Google Gemini API](https://ai.google.dev/docs)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)

## Notas Importantes

- **Seguridad**: Nunca expongas las credenciales en el código
- **Producción**: Usa variables de entorno seguras
- **Backup**: Exporta regularmente tus workflows
- **Monitoreo**: Revisa regularmente los logs y ejecuciones
