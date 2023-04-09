import { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./actions/auth";
// import setAuthToken from "./utils/setAuthToken";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        {/* <Navbar /> */}
        <section>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={() => <div>Dashboard</div>}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              component={() => <div>Dashboard</div>}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Provider>
  );
}

export default App;
