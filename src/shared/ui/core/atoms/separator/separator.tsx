import { Dimensions } from "react-native";
import { styled } from "../../../theme";

type TSeparatorProps = {
  width?: number;
};

const Container = styled.View<TSeparatorProps>`
  height: 1px;
  width: ${Dimensions.get("screen").width}px;
  ${({ width }) =>
    width &&
    `
    width: ${width}px;
  `}
  background-color: ${({ theme }) => theme.palette.text.blue};
`;

export const Separator = ({ width }: TSeparatorProps) => {
  return <Container width={width} />;
};
