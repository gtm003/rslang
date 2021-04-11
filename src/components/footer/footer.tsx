import React from 'react';
import {ItemGithubMember} from "./itemGithubMember";
import {ReactComponent as RsLogo} from '../../data/images/rs.svg';
import {ReactComponent as GithubLogo} from '../../data/images//github.svg';
import {githubMembers} from "../../data";
import {connect} from 'react-redux';

interface FooterProps {
  isAuth: boolean,
  isGameOpen: boolean,
}

const FooterRedux: React.FC<FooterProps> = ({isAuth, isGameOpen}) => {
  const classFooter = (isAuth) ? 'footer auth' : 'footer no-auth';

  return (
    <footer className={classFooter}>
      {!isGameOpen &&
      <div className="footer__content">
        <div className="footer__copyright">
          &#169;
          <span>2021 RSLang</span>
        </div>

        <div className="footer__github-members">
          <GithubLogo/>
          {githubMembers.map((name) => (
            <ItemGithubMember
              key={`developer${name}`}
              name={name}
            />
          ))}
        </div>

        <a target="_blank" rel="noreferrer" href="https://rs.school/js/">
          <RsLogo/>
        </a>

      </div>}
    </footer>
  )

};

const mapStateToProps = (state: any) => ({
  isAuth: state.login.isAuth,
  isGameOpen: state.setting.isGameOpen,
});

const Footer = connect(mapStateToProps)(FooterRedux);

export {Footer};
