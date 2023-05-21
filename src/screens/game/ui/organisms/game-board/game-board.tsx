import {
  $gameCondition,
  $gameMode,
  $gameState,
  $guess,
  setGameMode,
  setShownGameResults,
} from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { PrimaryButton, Typography, styled } from "@shared/ui";
import { useStore } from "effector-react";
import { MemoRowCells, RowCells } from "../../molecules";
import { FlatList, ListRenderItem, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { CustomKeyboard } from "@widgets/custom-keyboard";
import React from "react";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(6.5)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const Board = styled(FlatList<string>)`
  flex: 1;
  margin-top: ${({ theme }) => theme.spacing(8)}px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  z-index: 100;
`;

export const GameBoard = () => {
  const gameInfo = gameInfoByMode;
  const mode = useStore($gameMode);
  const { previousGuesses, attempt, word } = useStore($gameState);
  const guess = useStore($guess);
  const cellSize = Dimensions.get("screen").width / gameInfo[mode].letters - 12;
  const condition = useStore($gameCondition);
  console.log(word);

  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    return (
      <MemoRowCells
        wordLength={gameInfo[mode!].letters}
        word={
          index == attempt
            ? guess
            : index > attempt
            ? ""
            : previousGuesses[index]
        }
        isCurrent={index == attempt}
        cellSize={cellSize}
      />
    );
  };

  return (
    <Container>
      {/* <Title variant="largeTitle">Угадайте слово!</Title> */}
      <Board
        data={new Array(gameInfo[mode].attempts).fill(0)}
        renderItem={renderItem}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      />
      {condition === "WIN" || condition === "LOSE" ? (
        <ButtonContainer>
          <PrimaryButton
            onPress={() => {
              setShownGameResults(true);
            }}
          >
            Результат
          </PrimaryButton>
          <PrimaryButton
            onPress={() => {
              setGameMode(mode);
            }}
          >
            Следующее слово
          </PrimaryButton>
        </ButtonContainer>
      ) : (
        <CustomKeyboard setValue={() => {}} />
      )}
    </Container>
  );
};
