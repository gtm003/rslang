export const getData = async (
  group: number,
  page: number
): Promise<Array<Object>> => {
  const url: string = `https://react-rs-lang-words.herokuapp.com/words?group=${group}&page=${page}`;

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};
