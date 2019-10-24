import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import "./App.css";
import { Home, Login, Register, Profile, CompanyProfile } from "./screens";

function App() {
  return (
    <div className="App">
      <Router>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/company/:companyId" component={CompanyProfile} />
        <Route
          path="/login"
          render={() =>
            localStorage.getItem("token") ? (
              <Redirect
                to={{
                  pathname: "/"
                }}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
