import React from "react";

// Components
import Property from "../property/property";

// Styled Components
import {
  SecctionStyled,
  ListContainer,
} from "../../../styles/admin/listOfHouses/style";

const ListOfHouses = ({ houses, changesHouses, setchangesHouses }) => {
  return (
    <SecctionStyled>
      {houses.length > 0 && (
        <ListContainer>
          {houses.map((house) => (
            <Property
              key={house._id}
              {...house}
              changesHouses={changesHouses}
              setchangesHouses={setchangesHouses}
            />
          ))}
        </ListContainer>
      )}
    </SecctionStyled>
  );
};

export default ListOfHouses;
