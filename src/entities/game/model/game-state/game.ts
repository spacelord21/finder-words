import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
} from "effector";
import { getRandomWord } from "../../api";
import { TResponseWord } from "../../api/get-random-word";
import { wordsBase } from "./words";

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
export const setGuess = createEvent<string>();
export const enterPress = createEvent();
export const resetGuess = createEvent();
export const $guess = createStore<string>("").on(resetGuess, (_, __) => "");
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

$guess.on(setGuess, (state, content) => {
  switch (content) {
    case "<": {
      return state.slice(0, state.length - 1);
    }
    default: {
      return state.length == $gameState.getState().word.length
        ? state
        : state + content;
    }
  }
});

forward({
  from: checkGuess,
  to: resetGuess,
});

guard({
  clock: enterPress,
  source: $guess,
  filter: (guess, _) => {
    return (
      guess.length == $gameState.getState().word.length &&
      wordsBase.includes(guess)
    );
  },
  target: checkGuess,
});
