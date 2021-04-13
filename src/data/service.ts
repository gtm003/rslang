import { WordsProps } from "../common/ts/interfaces";
import {urlBackend} from "./index";

const url: string = `${urlBackend}words?all=true`;

export const getData = async (): Promise<Array<WordsProps>> => {

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};
