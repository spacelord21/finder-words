import {
  $gameCondition,
  $gameMode,
  $gameState,
  $guess,
  setGameMode,
  setShownGameResults,
} from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { PrimaryButton, styled } from "@shared/ui";
import { useStore } from "effector-react";
import { MemoRowCells } from "../../molecules";
import { FlatList, ListRenderItem, Dimensions } from "react-native";
import { CustomKeyboard } from "@widgets/custom-keyboard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Board = styled(FlatList<string>)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1)}px;
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  height: 65%;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing(2)}px;
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
  const cellWidth =
    Dimensions.get("screen").width / gameInfo[mode].letters - 12;
  const cellHeight =
    (Dimensions.get("screen").height * 0.53) / gameInfo[mode].attempts;
  const condition = useStore($gameCondition);

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
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        rightWord={word}
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
        <CustomKeyboard />
      )}
    </Container>
  );
};
