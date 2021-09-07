import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { DICTIONARY_TITLES, levelsEnglish } from "../../data";
import { Select } from "./select";
import { WordSlider } from "./word-slider";
import { Pagination } from "../pagination";
import { toggleOpen, toggleButtons } from "../../common/redux/action";
import { connect } from "react-redux";
import { Crumbs } from "../../common/navigation/crumbs";
import { getGroupWordsPerPage } from "./helpers";

interface WordListProps {
  toggleOpen: any;
  toggleButtons: any;
  group: number;
  pageInitial?: number;
  hardWords: [];
  deletedWords: [];
  isDictionary?: boolean;
  wordsType?: string;
  words: []
}

const WordListRedux: React.FC<WordListProps> = ({
  group,
  pageInitial = 0,
  isDictionary = false,
  wordsType = "",
  toggleOpen,
  toggleButtons,
  hardWords,
  deletedWords,
  words
}) => {

  const [page, setPage] = useState(pageInitial - 1);
  const location = useLocation();
  const history = useHistory();
  const name: string = levelsEnglish[group - 1].name;

  const route = isDictionary ? `dictionary/${wordsType}` : "tutorial";

  const changeSelectItem = (e: any) => {
    const newPage: number =
      typeof e === "number"
        ? e
        : e.target.value === ""
        ? -1
        : Number(e.target.value);
    history.push(`/${route}/group${group}/page${newPage + 1}`);
    setPage(newPage);
  };

  const dictionaryWords = getGroupWordsPerPage(
    wordsType,
    group,
    hardWords,
    deletedWords,
    words
  );

  return (
    <>
      <Crumbs path={location.pathname} />
      <div className="word-list">
        <p className="word-list__title">
          {isDictionary
            ? `${DICTIONARY_TITLES[wordsType]} слова раздела`
            : `топ 600 слов`}{" "}
          {name}
        </p>
        <div className="word-list__select">
          <NavLink to={`/games`}>
            <img src="/rslang/images/games.png" alt="open games" title="Open games" />
          </NavLink>
          {isDictionary ? (
            <Select
              changeSelectItem={changeSelectItem}
              page={page}
              isDictionary
              dictionaryWords={dictionaryWords}
            />
          ) : (
            <Select changeSelectItem={changeSelectItem} page={page} />
          )}
          <img
            src="/rslang/images/settingsIcon.png"
            alt="settings"
            title="Настройки"
            onClick={() => toggleOpen("true")}
          />
        </div>
        {isDictionary ? (
          <WordSlider
            group={group}
            page={page}
            isDictionary
            dictionaryWords={dictionaryWords}
            wordType={wordsType}
          />
        ) : (
          <WordSlider group={group} page={page} />
        )}
        <Pagination
          group={group}
          page={page + 1}
          changeSelectItem={changeSelectItem}
          isDictionary={isDictionary}
          wordsType={wordsType}
          dictionaryWords={dictionaryWords}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = {
  toggleOpen,
  toggleButtons,
};

const mapStateToProps = (state: any) => ({
  hardWords: state.data.hardWords,
  deletedWords: state.data.deletedWords,
  words: state.data.words
});

const WordList = connect(mapStateToProps, mapDispatchToProps)(WordListRedux);

export { WordList };
