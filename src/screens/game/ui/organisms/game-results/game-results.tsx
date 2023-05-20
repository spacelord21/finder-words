import { Close, PrimaryButton } from "@shared/ui";
import { Dimensions } from "react-native";
import { ResultGrid } from "../../molecules";
import { useStore } from "effector-react";
import {
  $gameCondition,
  $gameMode,
  $gameState,
  getRandomWordFx,
  setShownGameResults,
} from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { useTheme } from "styled-components";
import React from "react";
import { Container, IconWrapper, Text, Window } from "./styles";

const windowSize = Dimensions.get("screen").width - 32;

export const GameResults = React.memo(() => {
  const { attempt, word } = useStore($gameState);
  const theme = useTheme();
  const condition = useStore($gameCondition);
  const mode = useStore($gameMode);
  const gameInfo = gameInfoByMode;
  const result = condition == "WIN" ? "Победа!" : "Поражение!";
  return (
    <Container
      activeOpacity={1}
      onPress={() => {
        setShownGameResults(false);
      }}
    >
      <Window style={{ width: windowSize, height: windowSize + 64 }}>
        <Text variant="title" style={{ marginVertical: theme.spacing(2) }}>
          {result}
        </Text>
        <IconWrapper onPress={() => setShownGameResults(false)}>
          <Close />
        </IconWrapper>
        <ResultGrid />
        <Text variant="subtitle">
          Загаданное слово:{" "}
          <Text variant="subtitle" style={{ fontWeight: "bold" }}>
            {word}
          </Text>
        </Text>
        <Text variant="body16">
          {attempt} попыток из {gameInfo[mode].attempts}
        </Text>
        <PrimaryButton
          onPress={() => {
            getRandomWordFx(gameInfo[mode].letters);
          }}
          textColor={theme.palette.text.primary}
        >
          Следующее слово
        </PrimaryButton>
      </Window>
    </Container>
  );
});
