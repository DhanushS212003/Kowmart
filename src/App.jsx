import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "./context";
import { AuthLayout, Layout } from "./common";
import {
  AUTH_ROUTES,
  CATTLES_LIST,
  USERS_LIST,
  REPS_LIST,
  VERIFIED_CATTLES_LIST,
  REPS_CATTLES_LIST,
  REJECTED_CATTLES_LIST,
} from "./constants";
import useSyncedLocalStorage from "./hooks/useSyncedLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function App() {
  const location = useLocation();
  const [cattlesList, setCattlesList] = useSyncedLocalStorage(
    "cattlesList",
    CATTLES_LIST
  );
  const [usersList, setUsersList] = useSyncedLocalStorage(
    "usersList",
    USERS_LIST
  );
  const [repsList, setRepsList] = useSyncedLocalStorage("repsList", REPS_LIST);
  const [verifiedCattlesList, setVerifiedCattlesList] = useSyncedLocalStorage(
    "verifiedCattlesList",
    VERIFIED_CATTLES_LIST
  );
  const [rejectedCattlesList, setRejectedCattlesList] = useSyncedLocalStorage(
    "rejectedCattlesList",
    REJECTED_CATTLES_LIST
  );
  const [repsCattlesList, setRepsCattlesList] = useSyncedLocalStorage(
    "repsCattlesList",
    REPS_CATTLES_LIST
  );
  const [notificationsList, setNotificationsList] = useSyncedLocalStorage(
    "notificationsList",
    []
  );
  const [currentUser, setCurrentUser] = useSyncedLocalStorage(
    "currentUser",
    null
  );

  const activeUser = currentUser
    ? currentUser.type === "customer"
      ? usersList.find((e) => e.phone == currentUser.id)
      : repsList.find((e) => e.repId == currentUser.id)
    : null;

  const contextValue = useMemo(
    () => ({
      cattlesList,
      setCattlesList,
      usersList,
      setUsersList,
      repsList,
      setRepsList,
      verifiedCattlesList,
      setVerifiedCattlesList,
      rejectedCattlesList,
      setRejectedCattlesList,
      repsCattlesList,
      setRepsCattlesList,
      notificationsList,
      setNotificationsList,
      currentUser,
      setCurrentUser,
      activeUser,
    }),
    [
      cattlesList,
      usersList,
      repsList,
      verifiedCattlesList,
      rejectedCattlesList,
      repsCattlesList,
      notificationsList,
      currentUser,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {AUTH_ROUTES.some((e) => location.pathname.startsWith(e)) ? (
        <AuthLayout />
      ) : (
        <Layout />
      )}
    </AppContext.Provider>
  );
}

export default App;
