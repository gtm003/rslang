import React from "react";
import {connect} from 'react-redux';
import {toggleButtons, toggleTranslate} from "../../common/redux/action";

interface SettingsProps {
  isTranslate: boolean,
  areButtons: boolean,
  toggleTranslate: any,
  toggleButtons: any
}

const SettingsRedux: React.FC<SettingsProps> = ({areButtons, isTranslate, toggleTranslate, toggleButtons}) => {
  return (
    <form>
      <label>
        <input
          type="checkbox"
          checked={isTranslate}
          onChange={toggleTranslate}/>
        Показывать перевод
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={areButtons}
          onChange={toggleButtons}/>
        Возможность добавить в Сложные или Удаленные слова
      </label>
    </form>
  )
};

const mapStateToProps = (state: any) => ({
  isTranslate: state.setting.isTranslate,
  areButtons: state.setting.areButtons,
});

const mapDispatchToProps = {
  toggleButtons,
  toggleTranslate
};

const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsRedux);

export {Settings};
