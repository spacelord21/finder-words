import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  sample,
} from "effector";
import { $gameMode, setGameCondition, setGameMode } from "../game-processes";
import { TDictonary, TGameCondition } from "../../../types";
import { getDictionary, getTargets } from "../../api";

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

export const getDictionariesFx = createEffect<void, TDictonary, Error>(
  async () => {
    return await getDictionary();
  }
);
export const getTargetsFx = createEffect<void, TDictonary, Error>(async () => {
  return await getTargets();
});
const $dictionary = createStore<TDictonary>({
  "4_LETTERS": [],
  "5_LETTERS": [],
  "6_LETTERS": [],
}).on(getDictionariesFx.doneData, (state, payload) => payload);
export const $targets = createStore<TDictonary>({
  "4_LETTERS": [],
  "5_LETTERS": [],
  "6_LETTERS": [],
}).on(getTargetsFx.doneData, (state, payload) => payload);

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
      $dictionary.getState()[$gameMode.getState()].includes(guess)
    );
  },
  target: checkGuess,
});

sample({
  clock: setGameMode,
  fn: (mode): string => {
    const array = $targets.getState()[mode];
    return array[getRandomInt(array.length)];
  },
  target: setGameWord,
});

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

sample({
  clock: checkGuess,
  source: $gameState,
  fn: (gameState, guess): TGameCondition => {
    if (guess == gameState.word) return "WIN";
    if (gameState.attempt > gameState.word.length) {
      return "LOSE";
    }
    return "INPROGRESS";
  },
  target: setGameCondition,
});
