import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isDoctor } from "../controllers/authapi";

const DoctorRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isDoctor() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default DoctorRoute;
