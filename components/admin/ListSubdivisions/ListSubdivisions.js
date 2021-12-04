import Image from "next/image";

// Components
// import { ProgressCircle } from "../../../../components/IconsSVG/ProgressCircle";

// Styled Components
import {
  Section,
  Divicion,
  Info,
  Name,
  Images,
  Logo,
  ImageContainer,
} from "../../../styles/admin/ListSubdivisions/style";

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ListSubdivisions = ({ divicions }) => {
  // console.log("ListSubdivisions divicions: ", divicions);

  return (
    <Section>
      <h1>ListSubdivisions</h1>
      {divicions.map((divicion) => (
        <Divicion key={divicion._id}>
          <Info>
            {divicion.name && <Name>{divicion.name}</Name>}
            {divicion.pricem2 && <p>Precio por m2{divicion.pricem2}</p>}
            {divicion.slogan && <p>{divicion.slogan}</p>}
          </Info>
          {divicion.mainPhotography && (
            <Images>
              <Logo>
                <Image
                  loader={myLoader}
                  src={divicion.mainPhotography.url}
                  width={divicion.mainPhotography.width}
                  height={divicion.mainPhotography.height}
                  alt={`Fotografía de ${divicion.name}`}
                  placeholder="blurDataURL"
                />
              </Logo>
              {divicion.morePictures.length > 0 && (
                <>
                  {divicion.morePictures.map((picture, i) => (
                    <ImageContainer key={picture.public_id}>
                      <img
                        src={picture.url}
                        width={picture.width}
                        height={picture.height}
                        alt={`Fotografía numero ${i} de ${divicion.name}`}
                      />
                    </ImageContainer>
                  ))}
                </>
              )}
            </Images>
          )}
        </Divicion>
      ))}
    </Section>
  );
};

export default ListSubdivisions;
