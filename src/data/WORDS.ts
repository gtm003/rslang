import { WordsProps } from "../common/ts/interfaces";

const getDataPage = async (
  group: string | number,
  page?: number
): Promise<WordsProps[]> => {
  const url = `https://react-rs-lang-words.herokuapp.com/words?group=${group}&page=${page}`;

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

export {getDataPage};
