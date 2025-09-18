# Google Analytics - Configuración

## Descripción General

Este proyecto utiliza Google Analytics 4 (GA4) para el seguimiento de eventos y análisis de comportamiento de usuarios. La implementación se realizó siguiendo las mejores prácticas de Next.js y la documentación oficial de Google Analytics.

## Variable de Entorno Requerida

### NEXT_PUBLIC_GA_ID

**Descripción**: ID de medición de Google Analytics 4 (GA4) para el seguimiento de eventos.

**Formato**: `G-XXXXXXXXXX` (donde X son caracteres alfanuméricos)

**Ubicación**: Archivo `.env` en la raíz del proyecto

**Ejemplo**:

```bash
NEXT_PUBLIC_GA_ID=G-ABC123DEF4
```

## Cómo Obtener el ID de Google Analytics

1. **Accede a Google Analytics**:

   - Ve a [Google Analytics](https://analytics.google.com)
   - Inicia sesión con tu cuenta de Google

2. **Crea o selecciona una propiedad**:

   - Si es tu primera vez, crea una nueva propiedad
   - Si ya tienes una, selecciona la propiedad existente

3. **Obtén el ID de medición**:

   - En la configuración de la propiedad, busca "ID de medición"
   - Copia el ID que comienza con "G-"
   - También puedes encontrarlo en: Administrar → Flujo de datos → Tu flujo de datos → ID de medición

4. **Configuración adicional**:
   - Asegúrate de que el flujo de datos esté configurado para una aplicación web
   - Configura los dominios permitidos si es necesario
   - Debe estar activada la opción de [medición mejorada](https://support.google.com/analytics/answer/9216061#enable_disable) (leer [Tracking Pageviews](https://nextjs.org/docs/app/guides/third-party-libraries#tracking-pageviews))

## Implementación en el Proyecto

### 1. Configuración del Layout

El componente `GoogleAnalytics` se importa y configura en el [layout público](<../src/app/(public)/layout.tsx>):

```typescript
// src/app/(public)/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";

export default async function PublicLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {/* resto del layout */}
    </>
  );
}
```

### 2. Envío de Eventos Personalizados

Para enviar eventos personalizados, utiliza la función `sendGAEvent` (ejemplo en [EventButton](../src/app/components/EventButton/index.tsx)):

```typescript
// Ejemplo de uso
import { sendGAEvent } from "@next/third-parties/google";

const handleClick = () => {
  sendGAEvent("event", "button_click", {
    category: "engagement",
    label: "test_button",
    user_name: "test_user",
    date: new Date().toISOString(),
  });
};
```

### 3. Eventos Implementados

El proyecto incluye un botón de prueba que envía eventos de ejemplo:

- **Evento**: `button_click`
- **Categoría**: `engagement`
- **Etiqueta**: `test_button`
- **Datos adicionales**: `user_name`, `date`

## Verificación de Funcionamiento

1. **En el navegador**:

   - Instala la extensión Para navegadores rosados en Chromium [Google Analytics Debugger](https://chromewebstore.google.com/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
   - Abre las herramientas de desarrollador
   - Ve a la pestaña "Console"
   - Cada vez que se haga el Tag de algún evento, podés ver la información completa

2. **En Google Analytics**:

   - Ve a "Informes" → "Tiempo real"
   - Deberías ver actividad en tiempo real cuando navegues por la aplicación

3. **Eventos personalizados**:
   - Haz clic en el botón "Send Event" en la aplicación
   - Verifica que el evento aparezca en "Tiempo real" → "Eventos"

## Dependencias

- `@next/third-parties`: Librería oficial de [Next.js](https://nextjs.org/docs/app/guides/third-party-libraries) para integraciones de terceros (ya está integrada en este proyecto)

## Recursos Adicionales

- [Documentación oficial de Next.js - Third Party Libraries](https://nextjs.org/docs/app/guides/third-party-libraries)
- [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager?hl=es-419)
- [Google Analytics 4 - Guía de implementación](https://developers.google.com/analytics/devguides/collection/ga4)

## Notas Importantes

- La variable `NEXT_PUBLIC_GA_ID` debe tener el prefijo `NEXT_PUBLIC_` para estar disponible en el cliente
- Sin esta variable, la aplicación funcionará normalmente pero no se enviarán datos a Google Analytics
- Los eventos se envían de forma asíncrona y no bloquean la experiencia del usuario
- El seguimiento respeta la configuración de privacidad del navegador del usuario
