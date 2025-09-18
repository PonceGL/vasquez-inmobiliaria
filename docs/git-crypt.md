# Guía de Gestión de Secretos con git-crypt

Este documento es una guía sobre cómo manejamos los secretos (API keys, variables de entorno, etc.) en este proyecto. El objetivo es que cualquier persona, pueda entender y operar el sistema en minutos.

### 📜 Propósito y Metodología

Problema: Necesitamos almacenar archivos con información sensible (como .env) en nuestro repositorio de Git para que todo el equipo tenga la configuración correcta, pero no podemos subirlos en texto plano por razones de seguridad.

Solución: Usamos [git-crypt](https://github.com/AGWA/git-crypt) para encriptar archivos específicos dentro del repositorio. Los archivos encriptados se pueden subir a Git de forma segura. En nuestra máquina local, los vemos y editamos como archivos normales, y git-crypt maneja la encriptación y desencriptación de forma transparente.

Para este proyecto, hemos optado por usar una clave simétrica. Esto significa que hay una única clave maestra para el repositorio que se comparte de forma segura entre todos los colaboradores.

👨‍💻 Para Nuevos Colaboradores
Si acabas de clonar el proyecto, notarás que ciertos archivos (como .env) pueden no existir o parecer texto sin sentido. Sigue estos pasos una sola vez para obtener acceso:

1. Instala [git-crypt](https://github.com/AGWA/git-crypt/blob/master/INSTALL.md) si aún no lo tienes un tu sistema

Pide el archivo de clave a un mantenedor actual del proyecto.

Guarda este archivo en un lugar seguro en tu máquina, FUERA de la carpeta de este proyecto.

2. Desbloquea el Repositorio

Abre tu terminal, navega a la raíz de este proyecto y ejecuta el siguiente comando, apuntando a la ubicación donde guardaste la clave:

```
    git-crypt unlock /ruta/completa/hacia/tu/archivo-calve.key
```

Si el comando se ejecuta sin errores, ¡listo! git-crypt ha configurado tu repositorio local. Ahora podrás ver todos los archivos secretos en su formato original. El proceso a partir de ahora es 100% transparente.

Verificación:
Puedes correr `git-crypt status` para ver qué archivos están siendo protegidos. Deberías verlos marcados como encrypted.

### 🛠️ Para Mantenedores del Proyecto

Estas son tareas menos frecuentes que podrías necesitar realizar.

##### Añadir un Nuevo Archivo Secreto

Si necesitas encriptar un nuevo archivo (ej. secrets/new-service.json):

Abre el archivo [.gitattributes](/.gitattributes) en la raíz del proyecto.
Añade una nueva línea para especificar el archivo que quieres encriptar:

```
    secrets/new-service.json filter=git-crypt diff=git-crypt
```

Haz commit, asegurate de que tienes únicamente el cambio en `.gitattributes`.

Ahora, añade y haz commit del nuevo archivo secrets/new-service.json. git-crypt lo encriptará automáticamente.

Si la Clave Maestra se ve Comprometida
Este es un escenario de emergencia. Se deben rotar las credenciales y generar una nueva clave. Contacta al líder técnico del proyecto para proceder.

## ⚠️ Prácticas de Seguridad CRÍTICAS

**NUNCA, BAJO NINGUNA CIRCUNSTANCIA, HAGAS COMMIT DEL ARCHIVO .key AL REPOSITORIO. Está incluido en el .gitignore para prevenir accidentes, pero la responsabilidad final es tuya.**

SIEMPRE comparte el archivo .key a través de un canal seguro y verificado.

NO dejes el archivo .key en carpetas de fácil acceso como tu Escritorio o Descargas de forma permanente.
