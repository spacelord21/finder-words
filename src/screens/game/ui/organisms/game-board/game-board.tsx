import { $gameMode, $gameState, checkGuess } from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { Typography, styled } from "@shared/ui";
import { useStore } from "effector-react";
import { CellsMemo, RowCells } from "../../molecules";
import {
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { CustomKeyboard } from "@widgets/custom-keyboard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const GameBoard = () => {
  const gameInfo = gameInfoByMode;
  const mode = useStore($gameMode);
  const { previousGuesses, attempt } = useStore($gameState);
  const [guess, setGuess] = useState("");
  const cellSize =
    Dimensions.get("screen").width / gameInfo[mode!].letters - 32;

  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    return (
      <CellsMemo
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
      <FlatList
        data={new Array(gameInfo[mode!].attempts).fill(0)}
        renderItem={renderItem}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      />
      <CustomKeyboard setValue={setGuess} value={guess} />
      <TouchableOpacity
        onPress={() => {
          checkGuess(guess.toLocaleLowerCase());
          setGuess("");
        }}
      >
        <Typography>Enter</Typography>
      </TouchableOpacity>
    </Container>
  );
};
