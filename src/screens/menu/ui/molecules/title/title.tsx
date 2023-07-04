import { Typography, styled } from "@shared/ui";

const Container = styled.View`
  margin-top: ${({ theme }) => theme.spacing(20)}px;
  justify-content: center;
  align-items: center;
`;

const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.blue};
  letter-spacing: 4px;
`;

export const Title = () => {
  return (
    <Container>
      <Text variant="largeTitle">FINDER WORDS</Text>
    </Container>
  );
};
