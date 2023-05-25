import { useTheme } from "styled-components";
import { TBaseIconProps } from "./types";
import Svg, { Path } from "react-native-svg";
export const Back = ({ size, color }: TBaseIconProps) => {
  const theme = useTheme();
  return (
    <Svg width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24">
      <Path
        d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"
        fill={color ?? theme.palette.text.secondary}
      />
    </Svg>
  );
};
