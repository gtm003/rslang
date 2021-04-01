const toggleTranslate = (isTranslate: any)  => {
  return {
    type: 'TOGGLE_TRANSLATE',
    target: isTranslate.target.name,
    value: isTranslate.target.checked,
    payload: isTranslate,
  };
}

const toggleButtons = (areButtons: any)  => {
  return {
    type: 'TOGGLE_BUTTONS',
    target: areButtons.target.name,
    value: areButtons.target.checked,
    payload: areButtons,
  };
}

export {toggleTranslate, toggleButtons}