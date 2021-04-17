import React from "react";
import {useLocation} from "react-router-dom";
import {Crumbs} from "../../common/navigation/crumbs";
import { ShortStatistics } from "../shortStatistics";
import { LongStatistics } from "../longStatistics";

const Statistics: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <Crumbs path={location.pathname}/>
        <div className='statistic'>
          <ShortStatistics />
          <LongStatistics />
        </div>
    </>
  )
};

export {Statistics};