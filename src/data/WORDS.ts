import { urlBackend } from "./CONSTANTS";

interface SprintBodyProps {
  "id": "string",
  "group": 0,
  "page": 0,
  "word": "string",
  "image": "string",
  "audio": "string",
  "audioMeaning": "string",
  "audioExample": "string",
  "textMeaning": "string",
  "textExample": "string",
  "transcription": "string",
  "wordTranslate": "string",
  "textMeaningTranslate": "string",
  "textExampleTranslate": "string"
}

const getDataPage = async (group: number, page: number): Promise<SprintBodyProps[]> => {
  const url = `${urlBackend}words?group=${group}&page=${page}`

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const getData = async (url: string): Promise<SprintBodyProps[]> => {
    const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const urls: Array<string> = [];

for (let i = 0; i < 6; i += 1) {
  for (let j = 0; j < 30; j += 1) {
    urls.push(`${urlBackend}words?group=${i}&page=${j}`)
  }
}
/*
function httpGet(url:string) : Object {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        //error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}*/

export const DATA_WORDS: Array<Object> = [];

let chain = Promise.resolve();
urls.forEach((url) => {
  chain = chain
    .then(() => getData(url))
    .then((res: Object) => {
      DATA_WORDS.push(res);
    });
});

export {getDataPage};