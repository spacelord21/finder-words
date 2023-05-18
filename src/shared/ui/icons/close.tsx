import { useTheme } from "styled-components";
import { TBaseIconProps } from "./types";
import Svg, { Path } from "react-native-svg";
export const Close = ({ size, color }: TBaseIconProps) => {
  const theme = useTheme();
  return (
    <Svg width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24">
      <Path
        d="M3.4 22L2 20.6L8.6 14H4v-2h8v8h-2v-4.6L3.4 22ZM12 12V4h2v4.6L20.6 2L22 3.4L15.4 10H20v2h-8Z"
        fill={color ?? theme.palette.text.secondary}
      />
    </Svg>
  );
};
