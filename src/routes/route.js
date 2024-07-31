import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
// import { routesToMap } from ".";
const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
 

  const token = Cookies.get("admin_access_token");
  console.log({Component, token}, window.location.href)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && !token) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        return (
          <Layout>
             <Suspense fallback={<div>loading..</div>}>
            <Component {...props} />
            </Suspense>
          </Layout>
        );
      }}
    />
  );
};

export default AppRoute;
