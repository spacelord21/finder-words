import { Typography, styled } from "@shared/ui";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
  justify-content: center;
  align-items: center;
`;

export const Game = () => {
  return (
    <Container>
      <Typography>Hey there!</Typography>
    </Container>
  );
};
