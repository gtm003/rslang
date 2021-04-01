import React, {useState} from "react";
import { connect } from 'react-redux';
import {toggleButtons, toggleTranslate} from "../../common/redux/action";

interface SettingsProps {
  isTranslate: any,
  areButtons: any,
  toggleSetting: any
}

const Sett: React.FC<SettingsProps> = ({ areButtons, isTranslate, toggleSetting }) => {
  const [name, setName] = useState(true);

  console.log(areButtons);
  console.log(toggleSetting)

 const handleInputChange = (e: any) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    //const name = target.name;

    setName(value);
  }


    return (
      <form >
        {/*{settings.map((item: any) => {*/}
        {/*  return (*/}
        {/*    <label >*/}
        {/*      <input*/}
        {/*        name="isGoing"*/}
        {/*        type="checkbox"*/}
        {/*        checked={name}*/}
        {/*        onChange={handleInputChange} />*/}
        {/*      Пойдут*/}
        {/*    </label >)*/}

        {/*})}*/}
      </form >

  )


};

const mapStateToProps = (state:any) => ({
  isTranslate: state.isTranslate,
  areButtons: state.areButtons,
});

const mapDispatchToProps = {
  toggleButtons,
  toggleTranslate
};

const Settings = connect(mapStateToProps, mapDispatchToProps)(Sett);

export {Settings};
