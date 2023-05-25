import { styled } from "@shared/ui";

const ITEM_SIZE = 65;

const Container = styled.View<{ color: string }>`
  background-color: ${({ color }) => color};
  width: ${ITEM_SIZE / 2.7}px;
  height: ${ITEM_SIZE / 2.7}px;
  margin: ${({ theme }) => theme.spacing(0.3)}px;
  border-radius: 5px;
`;

type Props = {
  color: string;
};

export const Cell = ({ color }: Props) => {
  return <Container color={color} />;
};
