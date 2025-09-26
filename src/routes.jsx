import App from "./App";
import { Login, Register } from "./auth";
import { PageNotFound } from "./common";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import About from "./about/About";
import Sell from "./sell/Sell";
import CattleList from "./cattle/cattle_list/CattleList";
import List from "./cattle/cattle_list/List";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "about_us",
        element: <About />,
      },
      {
        path: "sell",
        element: <Sell />,
      },
      {
        path: "cattle_list",
        element: <CattleList />,
      },
      {
        path: "my_cattle_list",
        element: <List />,
      },
    ],
  },
  { path: "*", element: <PageNotFound /> },
];
