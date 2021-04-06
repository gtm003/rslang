import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {MainPage} from "../../components/main-page";
import {Team} from "../../components/team";
import {Tutorial} from "../../components/tutorial";
import {WordList} from "../../components/word-list";
import { Games } from '../../components/games';
import { GameSprint } from '../../components/sprint';
import { Dictionary } from '../../components/dictionary';
import { HardWords } from '../../components/hard-words';
import { HardWordsList } from '../../components/hard-words-list';


const Switcher: React.FC = () => {

  const isGroupExists: React.FC<any> = ({match}) => {
    const idGroup: number = Number(match.params.id);

    if (
      idGroup < 0
      || idGroup > 6
      || (idGroup ^ 0) !== idGroup
    ) {
      return <Redirect to='/tutorial'/>
    }

    return <WordList group={idGroup}/>
  };

  const isGroupPageExists: React.FC<any> = ({match}) => {
    const idGroup: number = Number(match.params.group);
    const idPage: number = Number(match.params.page);

    if (
      idGroup < 0
      || idGroup > 6
      || (idGroup ^ 0) !== idGroup
    ) {
      return <Redirect to='/tutorial'/>
    }

    if (
      idPage < 0
      || idPage > 30
      || (idPage ^ 0) !== idPage
    ) {
      const path = `/tutorial/group${idGroup}`;
      return <Redirect to={path}/>
    }

    return <WordList group={idGroup} pageInitial={idPage}/>
  };

  return (
    <Switch>
      <Route exact path='/' component={MainPage}/>
      <Route path='/team' component={Team}/>
      <Route exact path='/tutorial' component={Tutorial}/>
      <Route exact path='/games' component={Games}/>

      <Route exact path='/dictionary' component={Dictionary}/>
      <Route exact path='/dictionary/hard' component={HardWords}/>
      <Route path='/dictionary/hard/group1' component={() => <HardWordsList group={1}/>}/>

      <Route path='/statistics' component={Tutorial}/>
      <Route path='/games/sprint:level' render={({match}) => {
        const group = match.params.level || 0;
        return <GameSprint group={group} page={5}/>
      } }/>
      <Route path='/tutorial/group:group/page:page'
             component={(...props: Array<object>) => isGroupPageExists(props[0])}/>
      <Route path='/tutorial/group:id' component={(...props: Array<object>) => isGroupExists(props[0])}/>
      <Route />
      <Redirect path='*' to='/'/>
    </Switch>
  );
}

export {Switcher};
