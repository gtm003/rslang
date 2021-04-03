import { WordsProps } from "../common/ts/interfaces";

const url: string = `https://react-rs-lang-words.herokuapp.com/words?all=true`;

export const getData = async (): Promise<Array<WordsProps>> => {

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};
