import React from "react";

interface SelectProps {
  changeSelectItem: ((e: any) => void)
}

const Select: React.FC<SelectProps> = ({changeSelectItem}) => {
  const pages: Array<number> = Array.from(Array(30).keys());

  return (
    <div className="selectPages">
      <select onChange={changeSelectItem}>
        <option key='-1' value='-1'></option>
        {pages.map((id) => <option key={id} value={id}>Unit {id + 1}</option>)}
      </select>
    </div>
  )
}

export {Select};
