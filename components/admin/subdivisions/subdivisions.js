import React from "react";
import Link from "next/link";

// Components
import Subdivision from "../subdivision/subdivision";

//Styled Components
import {
  SubdivisionsStyled,
  SubdivisionsContainer,
  SubdivisionEmpty,
  Action,
} from "../../../styles/admin/subdivisions/style";

const Subdivisions = ({ subdivisions, changesHouses }) => {
  return (
    <SubdivisionsStyled>
      <SubdivisionsContainer>
        {subdivisions.length > 0 ? (
          <>
            {subdivisions.map((subdivision) => (
              <Subdivision
                key={subdivision._id}
                {...subdivision}
                changesHouses={changesHouses}
              />
            ))}
          </>
        ) : (
          <SubdivisionEmpty>
            <p>No hay ningún fraccionamiento registrado</p>
            <Link href="/admin/new-record/subdivision">
              <Action>Crear nuevo fraccionamiento</Action>
            </Link>
          </SubdivisionEmpty>
        )}
      </SubdivisionsContainer>
    </SubdivisionsStyled>
  );
};

export default Subdivisions;
