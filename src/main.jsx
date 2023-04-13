import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./store/Index/store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/Context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthContextProvider>
);
