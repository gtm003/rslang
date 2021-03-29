import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {MainPage} from "../../components/main-page";
import {Team} from "../../components/team";
import {Tutorial} from "../../components/tutorial";
import {Group} from "../../components/group";

const Switcher:React.FC = () => {
  const isGroupExists: React.FC<any> = ({match}) => {
    const idGroup: number = Number(match.params.id);

    if (
      idGroup < 0
      || idGroup > 6
      || (idGroup ^ 0) !== idGroup
    ) {
      return <Redirect to='/tutorial'/>
    }

    return <Group idGroup ={idGroup}/>
  }

  return (
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/team' component={Team}/>
      <Route exact path='/tutorial' component={Tutorial}/>
      <Route path='/games' component={Tutorial}/>
      <Route path='/dictionary' component={Tutorial}/>
      <Route path='/statistics' component={Tutorial}/>
      <Route path='/settings' component={Tutorial}/>
      <Route path='/tutorial/group/:id' component={(...props: Array<object>) => isGroupExists(props[0]) }/>
      <Redirect path='*' to='/'/>
    </Switch>
  );
}

export {Switcher};
