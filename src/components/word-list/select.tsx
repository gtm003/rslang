import React from "react";

const Select: React.FC = () => {
  const pages: Array<number> = Array.from(Array(30).keys());

  return (
    <form>
      <select>
        {pages.map((id) => <option>Unit {id + 1}</option>)}
      </select>
    </form>
  )
}

export {Select};