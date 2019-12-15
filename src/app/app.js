import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Routers from './routers';
import "./app.less";
// import "../asset/js/jquery-3.4.1.min"; // 引入本地第三方js文件

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