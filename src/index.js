import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import Spinner from "./views/spinner/Spinner";

import * as serviceWorker from "./serviceWorker";
import "./assets/scss/style.scss";
import "./data";

// setup fake backend
import { ConfigureFakeBackend } from "./jwt/_helpers";
ConfigureFakeBackend();

const App = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./app")), 0);
    })
);

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <HashRouter>
      <App />
    </HashRouter>
  </Suspense>,
  document.getElementById("root")
);

serviceWorker.unregister();