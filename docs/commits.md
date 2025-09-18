# Guía de Commits con Husky y Commitlint

Este documento detalla cómo usamos Husky y Commitlint para asegurar la calidad del código y mantener un historial de commits limpio y estandarizado.

📜 Propósito
Para mantener la calidad y la consistencia en nuestro repositorio, hemos automatizado dos revisiones clave antes de cada commit:

Calidad del Código (pre-commit): Se ejecutan el linter y los tests para asegurar que el código no tenga errores y no rompa la funcionalidad existente.

Formato del Mensaje (commit-msg): Se valida que el mensaje del commit siga la especificación de Conventional Commits con nuestras reglas personalizadas.

🛠️ Herramientas
Husky: Orquesta la ejecución de scripts en los hooks de Git.

Commitlint: Valida que los mensajes de commit sigan un formato específico.

🔄 Flujo de Trabajo del Desarrollador
Cuando ejecutas git commit, esto es lo que sucede automáticamente:

Hook pre-commit:

Husky ejecuta yarn lint. Si hay algún error de ESLint, el commit se aborta.

Si el linter pasa, Husky ejecuta yarn test. Si alguna prueba falla, el commit se aborta.

Hook commit-msg:

Si las validaciones de código pasan, commitlint analiza tu mensaje de commit.

Si el mensaje no sigue el formato configurado, el commit es rechazado y se muestra un error.

Este flujo asegura que cada commit que llega a nuestro repositorio ha pasado todas las pruebas de calidad.

✍️ Formato de Mensajes de Commit
Debes escribir tus mensajes de commit siguiendo el formato de Conventional Commits.

Estructura básica: tipo(ámbito): descripción corta

tipo: Define la categoría del cambio.

ámbito (obligatorio): Define la parte del código afectada (ej. auth, api, ui). Gracias a nuestra regla 'scope-empty': [2, 'never'], el ámbito no puede estar vacío.

descripción: Un resumen conciso del cambio en minúsculas y sin punto final.

Tipos de Commit Permitidos
Nuestra configuración (commitlint.config.js) define una lista estricta de tipos permitidos. Solo puedes usar los siguientes:

Tipo

Descripción

`feat`

Para una nueva funcionalidad (feature).

`fix`

Para una corrección de un bug.

`docs`

Cambios exclusivos en la documentación.

`refactor`

Refactorización de código que no arregla un bug ni añade una funcionalidad.

`perf`

Un cambio de código que mejora el rendimiento (performance).

`test`

Añadir o corregir tests.

`build`

Cambios que afectan el sistema de build o dependencias externas.

`ci`

Cambios en nuestros archivos y scripts de configuración de CI (Integración Continua).

Ejemplos de mensajes válidos:

`feat(auth): add user login page`

`fix(api): correct response status for invalid credentials`

`docs(readme): update setup instructions`

`build(deps): upgrade nextjs to version 15.5.4`

Ejemplos de mensajes inválidos:

chore: update dependencies -> Inválido porque chore no es un tipo permitido.

fix: missing validation -> Inválido porque falta el ámbito.

Si tu commit es rechazado, simplemente corrígelo usando git commit --amend y vuelve a intentarlo.
