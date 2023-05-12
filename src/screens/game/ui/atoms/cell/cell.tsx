import { $gameState } from "@entities/game";
import { useStore } from "effector-react";
import React, { useCallback, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import { Container, Stick, Value } from "./styles";
import { Animated } from "react-native";

export type TCellProps = {
  size: number;
  value?: string;
  index: number;
  isCurrent: boolean;
  isCurrentCell: boolean;
};

export const Cell = ({
  size,
  value,
  index,
  isCurrent,
  isCurrentCell,
}: TCellProps) => {
  const { word, wrong } = useStore($gameState);
  const theme = useTheme();
  const wordArray = word.split("");
  const color =
    wordArray.includes(value!) && !isCurrent
      ? wordArray[index] === value
        ? theme.palette.accent.success
        : theme.palette.accent.wrongPlace
      : wrong.includes(value!)
      ? theme.palette.keyboard.backspace
      : theme.palette.background.tertiary;
  const animRef = useRef(new Animated.Value(0)).current;

  const anim = useCallback(() => {
    Animated.timing(animRef, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, [value]);

  const spin = animRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    anim();
    return () => animRef.resetAnimation();
  }, [color]);

  return (
    <Animated.View
      style={{
        transform: [{ rotateX: spin }],
      }}
    >
      <Container
        size={size}
        color={color}
        isCurrent={isCurrent}
        isCurrentCell={isCurrentCell}
        value={value}
      >
        <Value variant="largeTitle">{value}</Value>
      </Container>
    </Animated.View>
  );
};

const shouldComponentUpdate = (prevProp: TCellProps, nextProp: TCellProps) => {
  return (
    prevProp.value === undefined &&
    prevProp.value === nextProp.value &&
    prevProp.isCurrentCell === nextProp.isCurrentCell &&
    prevProp.isCurrent === nextProp.isCurrent
  );
};

export const MemoCell = React.memo(Cell, shouldComponentUpdate);
