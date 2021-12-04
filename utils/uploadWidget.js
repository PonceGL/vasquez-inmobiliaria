export const uploadWidget = (morePictures, setMorePictures, maxImages) => {
  const widget = cloudinary.createUploadWidget(
    {
      cloudName: "civsa",
      uploadPreset: "civsa21",
      sources: ["local"],
      maxFiles: maxImages || 10,
      maxFileSize: 1000000,
      clientAllowedFormats: ["jpg", "png"],
      language: "es",
      text: {
        en: {
          or: "O",
          back: "Volver",
          advanced: "Avanzado",
          close: "Cerrar",
          no_results: "Sin resultados",
          search_placeholder: "Buscar archivos",
          about_uw: "About the Upload Widget",
          search: {
            placeholder: "Buscar en...",
            reset: "Reiniciar la búsqueda",
          },
          menu: {
            files: "Mis archivos",
            web: "Dirección web",
          },
          notifications: {
            general_error: "Ha ocurrido un error.",
            general_prompt: "¿Está seguro?",
            limit_reached: "No se pueden seleccionar más archivos.",
            invalid_add_url: "La URL debe ser válida.",
            invalid_public_id:
              "El ID público no puede contener \\,?,&,#,%,<,>.",
            no_new_files: "Los archivos ya han sido cargados.",
            image_purchased: "Imagen adquirida",
            video_purchased: "Video adquirido",
            purchase_failed:
              "La compra ha fallado. Por favor, inténtelo de nuevo.",
            service_logged_out: "Servicio desconectado debido a un error",
            great: "Genial",
          },
          queue: {
            title: "Cola de subida",
            title_uploading_with_counter: "Cargando {{num}} archivos",
            title_uploading: "Cargando archivos",
            mini_title: "Cargado",
            mini_title_uploading: "Cargando",
            show_completed: "Mostrar completado",
            retry_failed: "Reintento fallido",
            abort_all: "Abortar todo",
            upload_more: "Cargar más",
            done: "Hecho",
            mini_upload_count: "{{num}} subido",
            mini_failed: "{{num}} fallidos",
            statuses: {
              uploading: "Cargando...",
              error: "Error",
              uploaded: "Hecho",
              aborted: "Abortado",
            },
          },
          local: {
            browse: "Buscar",
            dd_title_single: "Arrastre y suelte un archivo aquí",
            dd_title_multi: "Arrastre y suelte los archivos aquí",
            drop_title_single: "Suelte un archivo para cargarlo",
            drop_title_multiple: "Suelte los archivos para cargarlos",
          },
          errors: {
            file_too_large:
              "Tamaño del archivo ({{size}}) supera el máximo permitido ({{allowed}})",
            unavailable: "NA",
            max_number_of_files: "Se ha superado el número máximo de archivos",
            allowed_formats: "Formato de archivo no permitido",
            max_file_size: "El archivo es demasiado grande",
            min_file_size: "El archivo es demasiado pequeño",
          },
        },
      },
      styles: {
        palette: {
          window: "#ffffff",
          windowBorder: "#0E2F5A",
          tabIcon: "#3d56b2",
          menuIcons: "#3d56b2",
          textDark: "#14279b",
          textLight: "#ffffff",
          link: "#4798f7",
          action: "#ff5151",
          inactiveTabIcon: "#0E2F5A",
          error: "#F44235",
          inProgress: "#4798f7",
          complete: "#1ee3cf",
          sourceBg: "#ffffff",
        },
      },
    },
    (error, result) => {
      if (error) {
        console.log("Error uploadWidget: ", error);
      } else if (result.event === "success") {
        const imageUpload = {
          url: result.info.secure_url,
          width: result.info.width,
          height: result.info.height,
          public_id: result.info.public_id,
          alt: result.info.original_filename,
        };
        setMorePictures((morePictures) => [...morePictures, imageUpload]);
      }
    }
  );

  widget.open();
};
