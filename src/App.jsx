import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/Context/auth-context";
import LoadingSpinner from "./components/UIElements/LoadingSpinner";

// import Layout from "./components/Layout/Layout";
// import UserProfile from "./components/Profile/UserProfile";
// import AuthPage from "./pages/AuthPage";
// import HomePage from "./pages/HomePage";

const Layout = React.lazy(() => import("./components/Layout/Layout"));
const UserProfile = React.lazy(() =>
  import("./components/Profile/UserProfile")
);
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="center-text">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/auth"
            element={
              !authCtx.isLoggedIn ? <AuthPage /> : <Navigate to="/profile" />
            }
          />
          <Route
            path="/profile"
            element={
              authCtx.isLoggedIn ? <UserProfile /> : <Navigate to="/auth" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;

/*


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import { fetchUsers } from "../../store/Actions/fetchuser-actions";
import { uiActions } from "../../store/Slice/userSlice";
import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const show = useSelector((state) => state.user.show);
  const search = useSelector((state) => state.user.search);
  const status = useSelector((state) => state.user.notifications.status);
  const message = useSelector((state) => state.user.notifications.message);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const inputSearchHandler = (event) => {
    dispatch(uiActions.setSearch(event.target.value));
  };

  let filteredUsername = users.filter((val) => {
    return val.username.toLowerCase().includes(search.toLowerCase());
  });

  const listItem = filteredUsername.map((product) => (
    <ProductItem id={product.id} key={product.id} username={product.username} />
  ));

  if (status === "error") {
    return (
      <section className={classes.error}>
        <h1>{message}</h1>
      </section>
    );
  }

  if (status === "pending") {
    return (
      <section className={classes.loading}>
        <h1>{message}</h1>
      </section>
    );
  }

  return (
    <>
      <div className={classes.search}>
        <input
          className={classes.searchBox}
          type="text"
          placeholder="Search User"
          onChange={inputSearchHandler}
        />
      </div>
      <ul className={classes.productList}>{!show && listItem}</ul>;
    </>
  );
};

export default StartingPageContent;


*/
