import { useTheme } from "styled-components";
import { TBaseIconProps } from "./types";
import Svg, { Path } from "react-native-svg";
export const Enter = ({ size, color }: TBaseIconProps) => {
  const theme = useTheme();
  return (
    <Svg width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24">
      <Path
        d="M8 19V5l11 7l-11 7Z"
        fill={color ?? theme.palette.text.primary}
      />
    </Svg>
  );
};
