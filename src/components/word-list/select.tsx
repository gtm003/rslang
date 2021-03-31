import React from "react";

interface SelectProps {
  page: number,
  changeSelectItem: ((e: any) => void)
}

const Select: React.FC<SelectProps> = ({page, changeSelectItem}) => {
  const pages: Array<number> = Array.from(Array(30).keys());

  return (
    <div className="selectPages">
      <select value={page} onChange={changeSelectItem}>
        <option key='-1' value='-1'></option>
        {pages.map((id) => <option key={id} value={id}>Unit {id + 1}</option>)}
      </select>
    </div>
  )
}

export {Select};
