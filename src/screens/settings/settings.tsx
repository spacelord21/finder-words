import { styled } from "@shared/ui";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
`;

export const Settings = () => {
  return <Container></Container>;
};
