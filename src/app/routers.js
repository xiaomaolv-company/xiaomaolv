import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React from "react";
import {Provider} from "mobx-react";
import stores from '../stores';
import {configure} from "mobx";

import Navigation from '@components/navigation';

import Home from '@pages/home';
import Setting from '@pages/setting';

configure({enforceActions: "observed"});  // 开启严格模式,让组件改变store中的state只能通过action的方式改变

const Routers = () => (
  <Provider {...stores}>
    <BrowserRouter>
      <Switch>
        <Navigation>
          <Route exact path="/" component={Home}/>
          <Route path="/setting" component={Setting}/>
        </Navigation>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routers;