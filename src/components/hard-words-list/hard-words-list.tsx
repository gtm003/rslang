import React from 'react';
import { connect } from 'react-redux';
import { levelsEnglish } from '../../data';
import { Select } from '../word-list/select';

interface HardWordsListProps {
  hardWords: [],
  group: number
}

const HardWordsListRedux: React.FC<HardWordsListProps> = ({ group, hardWords }) => {
  const name: string = levelsEnglish[group - 1].name;

  const groupHardWords:any = hardWords.filter((item: any) => item.group === group - 1);
  console.log(groupHardWords);

  return (
    <div className="hard-word-list">
      <h2 className='hard-word-list__title'>{`Сложные слова ${name}`}</h2>
      <div className="hard-word-list__select">
        {/* <Select changeSelectItem={changeSelectItem} page={page}/> */}
      </div>
      {/* <WordSlider group={group} page={page}/>
      <Pagination group={group} page={page + 1} changeSelectItem={changeSelectItem}/> */}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  hardWords: state.data.hardWords
});

const HardWordsList = connect(mapStateToProps)(HardWordsListRedux);

export { HardWordsList };