import { useState, useEffect } from "react";

// Styled-Components
import { SelectContainer, Default, Conatiner, SelectItems } from "./style";

const CustomSelect = ({ subdivisions, setSelectedSubdivision }) => {
  const [selectedOption, setSelectedOption] = useState("Ubicaciones");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedOption !== "Ubicaciones") {
      setSelectedSubdivision(selectedOption.replace(/ /g, "-"));
    }
  }, [selectedOption]);

  return (
    <SelectContainer open={open}>
      <Default onClick={() => setOpen(!open)} open={open}>
        {selectedOption}
      </Default>
      <Conatiner open={open}>
        {subdivisions.map((type) => (
          <SelectItems
            key={type._id}
            onClick={() => {
              setSelectedOption(type.name);
              setOpen(!open);
            }}
          >
            {type.name}
          </SelectItems>
        ))}
      </Conatiner>
    </SelectContainer>
  );
};

export default CustomSelect;
