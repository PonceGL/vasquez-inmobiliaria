# Guía de ESLint y Formateo Automático

Este documento describe la configuración de ESLint en el proyecto y cómo funciona el sistema de auto-corrección al guardar.

📜 Propósito
Usamos ESLint para analizar nuestro código de forma estática y encontrar problemas. El objetivo es mantener un estilo de código consistente, prevenir errores comunes y mejorar la calidad general del código base.

⚙️ Configuración Principal
La configuración se encuentra en el archivo eslint.config.mjs en la raíz del proyecto. Utilizamos la nueva configuración "flat" de ESLint, que es más moderna y explícita.

Las reglas base provienen de la configuración recomendada por Next.js (next/core-web-vitals y next/typescript).

Ordenamiento de Imports
Hemos añadido el plugin eslint-plugin-simple-import-sort para mantener todas las declaraciones import y export ordenadas automáticamente. Esto mejora la legibilidad y evita conflictos de merge triviales.

✨ Auto-corrección al Guardar
Para facilitar el cumplimiento de las reglas, hemos configurado el editor (VS Code) para que aplique automáticamente todas las correcciones de ESLint al guardar un archivo.

Esto es posible gracias al archivo .vscode/settings.json:

{
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit"
}
}

¿Qué significa esto para ti?
No tienes que preocuparte por ordenar los imports manualmente o por corregir pequeños errores de formato. Simplemente escribe tu código y, al presionar Ctrl + S (o Cmd + S), el editor lo arreglará por ti.

Asegúrate de tener la extensión de [ESLint](https://marketplace.cursorapi.com/items/?itemName=dbaeumer.vscode-eslint) para VS Code instalada para que esto funcione. El proyecto la recomendará automáticamente si no la tienes.
