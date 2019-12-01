import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React from "react";
import {Provider} from "mobx-react";
import stores from '../stores';
import {configure} from "mobx";

import WorkBench from '@pages/workBench';

// configure({enforceActions: "observed"});  // 开启严格模式,让组件改变store中的state只能通过action的方式改变

const Routers = () => (
  <Provider {...stores}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WorkBench}/>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routers;