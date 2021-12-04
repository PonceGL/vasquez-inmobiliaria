// Styled-Components
import { MainStyled, Box, Circle } from "../../../styles/admin/verifying/style";

const Verifying = () => {
  return (
    <MainStyled>
      <div>
        <h2>Verificando</h2>
        <Box>
          <Circle />
          <Circle />
          <Circle />
          <Circle />
        </Box>
      </div>
    </MainStyled>
  );
};

export default Verifying;
