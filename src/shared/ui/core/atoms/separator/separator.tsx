import { Dimensions } from "react-native";
import { styled } from "../../../theme";

const Container = styled.View`
  height: 1px;
  width: ${Dimensions.get("screen").width}px;
  background-color: ${({ theme }) => theme.palette.text.blue};
`;

export const Separator = () => {
  return <Container />;
};
