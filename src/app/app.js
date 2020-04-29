import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Routers from './routers';
import "./app.less";

const render = (Component) => (
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>, document.getElementById("root"))
);

render(Routers);


if (module.hot) {
  module.hot.accept("./routers.js", () => {
    const NextRouter = require("./routers").default;
    render(NextRouter);
  })
}