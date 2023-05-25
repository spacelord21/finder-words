import { styled } from "@shared/ui";
import { Cell } from "../../atoms";

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

type Props = {
  colors: string[];
};

export const RowCells = ({ colors }: Props) => {
  return (
    <Row>
      {colors.map((item, index) => (
        <Cell color={item} key={index} />
      ))}
    </Row>
  );
};
