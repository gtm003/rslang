interface SprintBodyProps {
  id: string;
  group: 0;
  page: 0;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  deletedWord: boolean;
  hardWord: boolean;
  corrects: number;
  errorsCount: number;
}

const getDataPage = async (
  group: number,
  page: number
): Promise<SprintBodyProps[]> => {
  const url = `https://react-rs-lang-words.herokuapp.com/words?group=${group}&page=${page}`;

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const urls: Array<string> = [];

for (let i = 0; i < 6; i += 1) {
  for (let j = 0; j < 30; j += 1) {
    urls.push(
      `https://react-rs-lang-words.herokuapp.com/words?group=${i}&page=${j}`
    );
  }
}

function httpGet(url: string): Object {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      }
    };

    //
    // xhr.onerror = function() {
    //   reject(new Error("Network Error"));
    // };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}

export const DATA_WORDS: Array<Object> = [];

let chain = Promise.resolve();
urls.forEach(function (url) {
  chain = chain
    .then(() => httpGet(url))
    .then((res: Object) => {
      DATA_WORDS.push(res);
    });
});

export { getDataPage };
