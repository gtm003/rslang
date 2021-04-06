import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { levelsEnglish } from '../../data';
import { GroupItem } from '../tutorial/groupItem';

interface HardWordsProps {
  hardWords: []
}

const HardWordsRedux: React.FC<HardWordsProps> = ({ hardWords }) => {

  console.log(hardWords);

  return (
    <div className='hard-words'>
      <h2 className='hard-words__title'>Сложные слова</h2>
      <div className="hard-words__groups" >
        {levelsEnglish.map(({id, title, name}) => {
          const key = `group${id}`;

          const renderedGroup = hardWords.findIndex(({group}) => group === id);

          return renderedGroup !== -1 ? (
            <NavLink to={`/dictionary/hard/group${id + 1}`} key={`group${id}`} >
              <GroupItem
                key={key}
                id={id}
                title={title}
                name={name}
                hoverHandler={(id: number) => {}}>
              </GroupItem >
            </NavLink >
          ) : null;
        })}
      </div >
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  hardWords: state.data.hardWords
});

const HardWords = connect(mapStateToProps)(HardWordsRedux);

export { HardWords };