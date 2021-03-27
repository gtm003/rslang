import React from "react";

interface SelectProps {
  changeSelectItem: ((e: any) => void)
}

const Select: React.FC<SelectProps> = ({changeSelectItem}) => {
  const pages: Array<number> = Array.from(Array(30).keys());

  return (
    <form>
      <select onChange={changeSelectItem}>
        {pages.map((id) => <option value={id}>Unit {id + 1}</option>)}
      </select>
    </form>
  )
}

export {Select};