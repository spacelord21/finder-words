import { useTheme } from "styled-components";
import { TBaseIconProps } from "./types";
import Svg, { Path } from "react-native-svg";
export const Backspace = ({ size, color }: TBaseIconProps) => {
  const theme = useTheme();
  return (
    <Svg width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24">
      <Path
        d="m11.4 16l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L18 9.4L16.6 8L14 10.6L11.4 8L10 9.4l2.6 2.6l-2.6 2.6l1.4 1.4ZM3 12l4.35-6.15q.275-.4.713-.625T9 5h10q.825 0 1.413.588T21 7v10q0 .825-.588 1.413T19 19H9q-.5 0-.938-.225t-.712-.625L3 12Z"
        fill={color ?? theme.palette.text.primary}
      />
    </Svg>
  );
};
