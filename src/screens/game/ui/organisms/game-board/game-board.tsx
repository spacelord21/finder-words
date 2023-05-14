import { $gameMode, $gameState } from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { Typography, styled } from "@shared/ui";
import { useStore } from "effector-react";
import { RowCells } from "../../molecules";
import { FlatList, ListRenderItem, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { CustomKeyboard } from "@widgets/custom-keyboard";

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
  flex: 1.6;
`;

export const GameBoard = () => {
  const gameInfo = gameInfoByMode;
  const mode = useStore($gameMode);
  const { previousGuesses, attempt } = useStore($gameState);
  const [guess, setGuess] = useState("");
  const cellSize = Dimensions.get("screen").width / gameInfo[mode].letters - 12;
  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    return (
      <RowCells
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
      <Title variant="largeTitle">Угадайте слово!</Title>
      <Board
        data={new Array(gameInfo[mode].attempts).fill(0)}
        renderItem={renderItem}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      />
      <CustomKeyboard setValue={setGuess} />
    </Container>
  );
};
