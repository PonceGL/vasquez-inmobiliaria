import React from "react";

// Components
import Amenities from "../amenities/Amenities";

// Styled Components
import { Container } from "../../../styles/admin/services/style";

const Services = ({ amenities, setAmenities }) => {
  return (
    <Container>
      <h4>Otros Servicios</h4>
      {amenities.map((plus, i) => (
        <Amenities
          key={i}
          plus={plus}
          i={i}
          amenities={amenities}
          setAmenities={setAmenities}
        />
      ))}
    </Container>
  );
};

export default Services;
