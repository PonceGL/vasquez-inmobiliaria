import React from "react";

// Components
import Services from "../services/Services";

// Styled Components
import {
  Fieldset,
  Legend,
  Label,
  InputTextBase,
  InputNumber,
  Select,
} from "../../../styles/admin/fieldsetHose/style";

const FieldsetHose = ({ amenities, setAmenities }) => {
  return (
    <Fieldset length={amenities.length > 0 ? true : false}>
      <Legend>Detalles</Legend>
      <Label htmlFor="frontMeasurement">
        Medida de frente
        <InputNumber
          type="number"
          id="frontMeasurement"
          name="frontMeasurement"
          placeholder="m²"
        />
      </Label>
      <Label htmlFor="bottomMeasurement">
        Medida de fondo
        <InputNumber
          type="number"
          id="bottomMeasurement"
          name="bottomMeasurement"
          placeholder="m²"
        />
      </Label>
      <Label htmlFor="preservation">
        Estado de conservación
        <InputTextBase
          type="text"
          id="preservation"
          name="preservation"
          placeholder="Muy bueno"
        />
      </Label>
      <Label htmlFor="levelsConstructed">
        Niveles construidos
        <InputNumber
          type="number"
          id="levelsConstructed"
          name="levelsConstructed"
          placeholder="2"
        />
      </Label>
      <Label htmlFor="age">
        Edad
        <InputNumber type="number" id="age" name="age" placeholder="1 año" />
      </Label>
      <Label htmlFor="age">
        Moneda
        <Select id="currency" name="currency" defaultValue="MXN">
          <option value="MXN">MXN</option>
          <option value="USD">USD</option>
        </Select>
      </Label>
      <Services amenities={amenities} setAmenities={setAmenities} />
    </Fieldset>
  );
};

export default FieldsetHose;
