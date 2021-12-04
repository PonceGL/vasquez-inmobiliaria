import React, { useEffect } from "react";
import { useRouter } from "next/router";

// Styled Components
import {
  Succes,
  Cirlce,
  CirlceLeft,
  Check,
  Result,
  ResultTitle,
  Bg,
} from "../../../styles/admin/succesAlert/style";

const SuccesAlert = ({ name }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(`/admin`);
    }, 1000);
  }, []);
  return (
    <>
      <Succes>
        <Check />
        <CirlceLeft />
        <Cirlce />
        <Result>
          <ResultTitle>Se registró correctamente {name}</ResultTitle>
        </Result>
      </Succes>
      <Bg />
    </>
  );
};

export default SuccesAlert;
