import React from 'react';
import {githubSrc} from "../../data";

interface ItemGithubMember {
  name: string,
}

const ItemGithubMember: React.FC<ItemGithubMember> = ({name}) => {
  const src = `${githubSrc}${name}`;

  return (
      <a target='_blank' rel="noreferrer" href={src} >
        <span >{name}</span >
      </a >
  )
};

export {ItemGithubMember};