import { useState } from "react";
// Styled-Components
import {
  Container,
  ButtonFinancing,
  FinancingArrow,
  CloseButton,
  First,
  List,
  ListItem,
  Last,
  BackgroundImage,
} from "./style";

const Financing = () => {
  const [deploy, setDeploy] = useState(false);

  return (
    <Container deploy={deploy}>
      <CloseButton
        type="button"
        deploy={deploy}
        onClick={() => setDeploy(!deploy)}
      />
      <ButtonFinancing
        type="button"
        deploy={deploy}
        onClick={() => setDeploy(!deploy)}
      >
        Opciones de financiamiento
      </ButtonFinancing>
      <FinancingArrow deploy={deploy} />

      {deploy && (
        <>
          <First>
            <h4>OFRECEMOS FINANCIAMIENTO BAJO ESTA MODALIDAD:</h4>
            <List>
              <ListItem>
                <span>40%</span> DE ENGANCHE A 6 MESES SIN INTERESES
              </ListItem>
              <ListItem>
                <span>40%</span> DE ENGANCHE A 12 MESES CON EL 1.2% DE INTERES
                SOBRE SALDOS INSOLUTOS
              </ListItem>
              <ListItem>
                TAMBIEN ACEPTAMOS CREDITOS FOVISSTE, INFONAVIT, INSTITUCIONES
                BANCARIAS, SIMULACIÓN DE CREDITO
              </ListItem>
            </List>
          </First>

          <Last>
            <p>FECHA DE ACTUALIZACION DE PRECIOS 28/07/2021</p>
            <p>LOS PRECIOS ESTÁN SUJETOS A CAMBIO SIN PREVIO AVISO</p>
          </Last>
          <BackgroundImage />
        </>
      )}
    </Container>
  );
};

export default Financing;
