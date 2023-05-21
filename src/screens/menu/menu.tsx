import { styled } from "@shared/ui";
import { Categories, Title } from "./ui";
import { useStore } from "effector-react";
import { $targets } from "@entities/game";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
  justify-content: center;
  align-items: center;
`;

export const Menu = () => {
  return (
    <Container>
      <Title />
      <Categories />
    </Container>
  );
};
