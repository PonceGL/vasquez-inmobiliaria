// Styled-Componets
import { Container } from "./style";

const SellText = () => {
  return (
    <Container>
      <h2>¿Qué es Lorem Ipsum?</h2>
      <p>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y
        archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
        las industrias desde el año 1500, cuando un impresor (N. del T. persona
        que se dedica a la imprenta) desconocido usó una galería de textos y los
        mezcló de tal manera que logró hacer un libro de textos especimen. No
        sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno
        en documentos electrónicos, quedando esencialmente igual al original.
      </p>

      <h2>¿Por qué lo usamos?</h2>
      <p>
        Es un hecho establecido hace demasiado tiempo que un lector se distraerá
        con el contenido del texto de un sitio mientras que mira su diseño. El
        punto de usar Lorem Ipsum es que tiene una distribución más o menos
        normal de las letras, al contrario de usar textos como por ejemplo
        "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un
        español que se puede leer. Muchos paquetes de autoedición y editores de
        páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer
        una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web
        que usan este texto si se encuentran en estado de desarrollo.
      </p>
    </Container>
  );
};

export default SellText;
