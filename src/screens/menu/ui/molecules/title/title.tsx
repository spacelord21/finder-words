import { Typography, styled } from "@shared/ui";

const Container = styled.View`
  margin-top: ${({ theme }) => theme.spacing(14)}px;
  justify-content: center;
  align-items: center;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const Title = () => {
  return (
    <Container>
      <Text variant="largeTitle">Finder Words</Text>
    </Container>
  );
};
