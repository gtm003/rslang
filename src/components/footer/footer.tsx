import React from 'react';
import {ItemGithubMember} from "./itemGithubMember";
import {ReactComponent as RsLogo} from '../../data/images/rs.svg';
import {ReactComponent as GithubLogo} from '../../data/images//github.svg';
import {githubMembers} from "../../data";

const Footer = () => {
  return (
    <footer className="footer" >
      <div className="footer__content" >

        <div className="footer__copyright" >
          <img src="/images/cr.png" alt="copyright" />
          <span >2021 RSLang</span >
        </div >

        <div className="footer__github-members" >
          <GithubLogo />
          {githubMembers.map((name) => (
            <ItemGithubMember
              key={`developer${name}`}
              name={name}
            />
          ))}
        </div >

        <span >
          <a target="_blank" rel="noreferrer" href="https://rs.school/js/" >
           <RsLogo />
          </a >
        </span >

      </div >
    </footer >
  );
};

export {Footer};