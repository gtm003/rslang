import React from 'react';
import { Link } from 'react-router-dom';
import { dictionaryLinks } from '../../data';

const Dictionary: React.FC = () => {
  return (
    <div className='dictionary'>
      {dictionaryLinks.map(({ name, link }, index) => {
        return <Link to={`/dictionary/${link}`} key={`dictionary${index}`} 
                     className="dictionary__link">{name}</Link>
      })}
    </div>
  )
}

export { Dictionary };