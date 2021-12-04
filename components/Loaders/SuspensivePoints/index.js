// Styled-Components
import { Conatiner, Point } from "./style";

export const SuspensivePoints = () => {
  return (
    <Conatiner>
      <Point />
      <Point delay={0.1} />
      <Point delay={0.2} />
    </Conatiner>
  );
};
