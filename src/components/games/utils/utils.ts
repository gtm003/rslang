import { WordsProps } from "../../../common/ts/interfaces";

export const shuffleArray = (array: WordsProps[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const highlightWords = (wordTranslations: NodeListOf<HTMLLIElement>, wordTranslation: WordsProps): void => {
  wordTranslations?.forEach((translation: HTMLLIElement) => {
    translation.textContent?.match(/[а-я-,]/gi)?.join('') === wordTranslation.wordTranslate.replace(/\s/g, '') ?
      translation.classList.add("word-correct") :
      translation.classList.add("word-wrong");
  });
};

export const removeWordsHighlighting = (wordTranslations: NodeListOf<HTMLLIElement>, wordTranslation: WordsProps): void => {
  wordTranslations?.forEach((translation) => {
    translation.textContent?.match(/[а-я-,]/gi)?.join('') === wordTranslation.wordTranslate.replace(/\s/g, '') ?
      translation.classList.remove("word-correct") :
      translation.classList.remove("word-wrong");
  })
};