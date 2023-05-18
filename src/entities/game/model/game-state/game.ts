import { createEffect, createEvent, createStore } from "effector";
import { getRandomWord } from "../../api";
import { TResponseWord } from "../../api/get-random-word";

const initialGameState: TGameState = {
  attempt: 0,
  previousGuesses: [],
  word: "слой",
  correctLetters: [],
  wrong: [],
  wrongPlaceLetters: [],
};

export type TGameState = {
  word: string;
  attempt: number;
  previousGuesses: string[];
  correctLetters: string[];
  wrongPlaceLetters: string[];
  wrong: string[];
};

export const $gameState = createStore<TGameState>(initialGameState);
export const getRandomWordFx = createEffect<number, TResponseWord, Error>(
  async (letters) => {
    return await getRandomWord(letters);
  }
);

export const checkGuess = createEvent<string>();
export const setGameWord = createEvent<string>();

$gameState.on(setGameWord, (state, payload) => {
  return { ...initialGameState, word: payload };
});
$gameState.on(checkGuess, (state, guess) => {
  let wrong = [];
  let correct = [];
  let wrongPlace = [];
  const guessInLetters = guess.split("");
  const wordInLetters = state.word.split("");
  for (let i = 0; i < wordInLetters.length; i++) {
    for (let j = 0; j < wordInLetters.length; j++) {
      if (i == j && wordInLetters[i] == guessInLetters[j]) {
        correct.push(guessInLetters[j]);
        break;
      }
      if (i != j && wordInLetters[i] == guessInLetters[j]) {
        wrongPlace.push(guessInLetters[j]);
        break;
      }
      wrong.push(guessInLetters[j]);
    }
  }
  return {
    attempt: state.attempt + 1,
    previousGuesses: [...state.previousGuesses, guess],
    word: state.word,
    correctLetters: Array.from(new Set([...state.correctLetters, ...correct])),
    wrong: Array.from(new Set([...state.wrong, ...wrong])),
    wrongPlaceLetters: Array.from(
      new Set([...state.wrongPlaceLetters, ...wrongPlace])
    ),
  };
});

getRandomWordFx.failData.watch((payload) => {
  console.log(payload);
});
