import { WordsProps } from "../common/ts/interfaces";
import {urlBackend} from "./index";
import {stateUser} from "../common/redux/login-reducer";



const getDataPage = async (
  group: string | number,
  page?: number,
): Promise<WordsProps[]> => {
  const userId = stateUser ? stateUser.user.userId : null ;
  //const url = `${urlBackend}users/${userId}/words?group=${group}&page=${page}`;
  const url = `${urlBackend}words?group=${group}&page=${page}`;
  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

export {getDataPage};
