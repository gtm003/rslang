import React from "react";
import {NavLink} from "react-router-dom";

interface PaginationProps {
  page: number,
  group: number,
  changeSelectItem: ((e: any) => void)
}

const maxPages: number = 30;

const Pagination: React.FC<PaginationProps> = ({group, page, changeSelectItem}) => {
  const classBtn: string = `pagination__btn btn pagination__btn--${group-1}`;
  const classRightBtn: string = (page === maxPages) ? classBtn + ' hidden' : classBtn;
  const classLeftBtn: string = (page <= 1) ? classBtn + ' hidden' : classBtn;

  return (
    <div className="pagination">
      <NavLink to={`/tutorial/group${group}/page${page - 1}`}>
        <button className={classLeftBtn} onClick={() => changeSelectItem(page-2)}>
          <img src='/images/arrowLeft.png' alt='arrow left'/>
          Unit {page - 1}
        </button>
      </NavLink>
      <NavLink to={`/tutorial/group${group}/page${page + 1}`}>
        <button className={classRightBtn}  onClick={() => changeSelectItem(page)}>
          Unit {page + 1}
          <img src='/images/arrowRight.png' alt='arrow right'/>
        </button>
      </NavLink>
    </div>
  )
};

export {Pagination};
