import React, { useRef, useEffect, useState } from "react";

// Styled Components
import {
  Label,
  InputTextBase,
  Button,
  Benefits,
  DeleteButton,
} from "../../../styles/admin/amenities/style";

// Data
const benefits = [
  "Áreas verdes",
  "Plazas comerciales",
  "Vigilancia",
  "Terraza",
  "Patio trasero",
];

const Amenities = ({ plus, i, amenities, setAmenities }) => {
  const [newPlus, setNewPlus] = useState("");
  const otherPlus = useRef(null);

  const updateBenefits = () => {
    let chain = amenities.filter((item) => item !== "");
    setAmenities(chain);
    setAmenities((chain) => [...chain, newPlus]);
    setAmenities((amenities) => [...amenities, ""]);
  };

  const removeBenefits = () => {
    let chain = amenities.filter((item) => item !== plus);
    setAmenities(chain);
  };

  const prevent = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (otherPlus.current) {
      let inputText = otherPlus.current;
      inputText.addEventListener("keypress", (e) => prevent(e));
      return () => {
        inputText.removeEventListener("keypress", (e) => prevent(e));
      };
    }
  }, [otherPlus]);

  return (
    <>
      {plus === "" ? (
        <Label htmlFor="plus">
          <InputTextBase
            type="text"
            id="plus"
            name="plus"
            placeholder={benefits[i] !== undefined ? `${benefits[i]}` : `Otro`}
            ref={otherPlus}
            onChange={(e) => setNewPlus(e.target.value)}
            column={newPlus === "" ? true : false}
          />
          {newPlus !== "" && <Button type="button" onClick={updateBenefits} />}
        </Label>
      ) : (
        <Benefits>
          <DeleteButton type="button" onClick={removeBenefits} />
          {plus} |
        </Benefits>
      )}
    </>
  );
};

export default Amenities;
