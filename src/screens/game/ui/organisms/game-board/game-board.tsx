import { $gameMode, $gameState, checkGuess } from "@entities/game";
import { gameInfoByMode } from "@entities/types";
import { Typography, styled } from "@shared/ui";
import { useStore } from "effector-react";
import { RowCells } from "../../molecules";
import { TextInput, TouchableOpacity, Keyboard } from "react-native";
import { useEffect, useRef, useState } from "react";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const KeyBoard = styled.View`
  flex: 1;
`;

const CellsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GameBoard = () => {
  const gameInfo = gameInfoByMode;
  const mode = useStore($gameMode);
  const { previousGuesses, attempt } = useStore($gameState);
  const [guess, setGuess] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Container>
      <CellsContainer>
        {new Array(gameInfo[mode ?? "4_LETTERS"].attempts)
          .fill(0)
          .map((prev, index) => (
            <RowCells
              wordLength={4}
              key={index}
              word={
                index == attempt
                  ? guess
                  : index > attempt
                  ? ""
                  : previousGuesses[index]
              }
              isCurrent={index == attempt}
            />
          ))}
      </CellsContainer>
      <TextInput
        onChangeText={setGuess}
        style={{
          width: 180,
          height: 70,
          borderWidth: 1,
          borderColor: "red",
          color: "orange",
          fontSize: 20,
        }}
        ref={inputRef}
        value={guess}
      />
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
