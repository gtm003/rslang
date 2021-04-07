import React from "react";
import {TEAM} from "../../data";
import {githubMembers, githubSrc} from "../../data";

const Team: React.FC = () => {
  return (
    <div className='team-wrapper'>
      <h1>над проектом работали</h1>
      <div className='team'>
        {
          TEAM.map((member) => {
           return (
             <div className='team__member'>
              <img src={`images/team/${githubMembers[member.id]}`}/>
            </div>)
          })
        }
      </div>
      </div>
  )
};

export {Team};