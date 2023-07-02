import { Close, PrimaryButton } from "@shared/ui";
import { Dimensions } from "react-native";
import { ResultGrid } from "../../molecules";
import { useStore } from "effector-react";
import {
  $gameCondition,
  $gameMode,
  $gameState,
  setGameCondition,
  setGameMode,
  setShownGameResults,
} from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { useTheme } from "styled-components";
import React from "react";
import { Container, IconWrapper, Text, Window, Separator } from "./styles";

const windowSize = Dimensions.get("screen").width - 32;

export const GameResults = React.memo(() => {
  const { attempt, word } = useStore($gameState);
  const theme = useTheme();
  const condition = useStore($gameCondition);
  const mode = useStore($gameMode);
  const gameInfo = gameInfoByMode;
  const result = condition == "WIN" ? "Победа!" : "Поражение!";

  const onNextWordClickHandler = () => {
    setGameMode(mode);
    setGameCondition("INPROGRESS");
    setShownGameResults(false);
  };

  return (
    <Container activeOpacity={1}>
      <Window
        style={{
          width: windowSize - 8,
          height: 1.5 * windowSize,
        }}
      >
        <Text variant="title" style={{ marginVertical: theme.spacing(2) }}>
          {result}
        </Text>
        <Separator width={windowSize - 8} />
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
          onPress={onNextWordClickHandler}
          textColor={
            theme.name == "light" ? "#ffffff" : theme.palette.text.primary
          }
        >
          Следующее слово
        </PrimaryButton>
      </Window>
    </Container>
  );
});
