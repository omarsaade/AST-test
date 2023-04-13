import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/Context/auth-context";
import LoadingSpinner from "./components/UIElements/LoadingSpinner";

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
