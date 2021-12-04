import Image from "next/image";
import Link from "next/link";

// Formatea el precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Styled-Components
import { Container, ImageContainer, Info } from "./style";

const Related = (props) => {
  const { _id, description, mainPhotography, price, title } = props;

  return (
    <Container>
      <Link href={`/detalles/casa/${_id}`}>
        <ImageContainer>
          <Image
            loader={loader}
            src={mainPhotography.url}
            alt={mainPhotography.alt}
            width={mainPhotography.width}
            height={mainPhotography.height}
            placeholder="blur"
            blurDataURL
          />
        </ImageContainer>
      </Link>

      <Link href={`/detalles/casa/${_id}`}>
        <Info>
          <p>{title}</p>
          <p>${formatter.format(price)}</p>
          <p>{description}</p>
        </Info>
      </Link>
    </Container>
  );
};

export default Related;
