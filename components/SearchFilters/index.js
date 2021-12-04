import React, { useEffect, useState } from "react";
import Axios from "axios";
import Link from "next/link";

// Components
import MoreFilters from "../MoreFilters";

// Styled-Components
import {
  FilterContainer,
  ActionsContainer,
  ButtonFilter,
  Conter,
  ButtonsContainer,
  ContainerScroll,
  Button,
  MoreFiltersButton,
} from "./style";

const SearchFilters = ({ houses }) => {
  const [typeOfPropertys, setTypeOfPropertys] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);

  // Filters
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [selectedSubdivision, setSelectedSubdivision] = useState(
    "La-Molienda,Ojo-De-Agua"
  );

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.get("/api/typeOfPropertys");
      setTypeOfPropertys(data.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.post(`/api/subdivisions/some`, {
        match: {},
        query: {
          name: 1,
          mainPhotography: 1,
          pricem2: 1,
          showOnweb: 1,
        },
        limit: 2,
      });
      if (data.status) {
        const names = data.data.map((item) => item.name);
        setSelectedSubdivision(names.toString().replace(/ /g, "-"));
      }
    };
    getData();
  }, []);

  return (
    <>
      <MoreFilters
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        typeOfPropertys={typeOfPropertys.filter(
          (item) => item !== "casa" && item !== "terreno"
        )}
        subdivisions={selectedSubdivision}
      />
      <FilterContainer>
        <Conter>Tienes {houses.length} resultados </Conter>
        <ButtonsContainer>
          <ContainerScroll col={typeOfPropertys.length}>
            {typeOfPropertys.map((type) => (
              <Button
                type="button"
                key={type}
                select={typeOfProperty === type ? true : false}
                onClick={() => setTypeOfProperty(type)}
              >
                {type}
              </Button>
            ))}
          </ContainerScroll>
        </ButtonsContainer>
        <ActionsContainer>
          <Link
            href={
              typeOfProperty === ""
                ? "#"
                : `/busqueda?subdivision=${selectedSubdivision},Otro,null&type=${typeOfProperty}&minp=0&maxp=999999999&minsize=0&maxsize=999999999&rooms=0&bathrooms=0&parking=0`
            }
          >
            <ButtonFilter active={typeOfProperty === "" ? true : false}>
              Filtrar
            </ButtonFilter>
          </Link>
          <MoreFiltersButton
            type="button"
            onClick={() => setOpenFilters(!openFilters)}
          >
            Más
          </MoreFiltersButton>
        </ActionsContainer>
      </FilterContainer>
    </>
  );
};

export default SearchFilters;
