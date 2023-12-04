import { useEffect } from "react";
import { ADialog, ANavbar } from "./components";
import AppRoutes from "./routes";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  getCategoryAction,
  getSourceAction,
  setUserData,
  userDataSelector,
} from "./redux/features/userPrefSlice";
import { useLocalStorage } from "./hooks";
import { UserPreferences } from "./types";

function App() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userDataSelector);

  const [currentPref, setCurrentPref] = useLocalStorage<UserPreferences>(
    "feed-pref",
    {
      isVisited: false,
      category: [],
      lang: "",
      country: "",
      source: [],
    }
  );

  useEffect(() => {
    if (currentPref) dispatch(setUserData(currentPref));
    if (!currentPref.isVisited) {
      (document.getElementById("feed_modal") as any).showModal();
    }
  }, []);

  useEffect(() => {
    setCurrentPref(userData);
  }, [userData]);
  
  // useEffect(() => {
    // dispatch(getSourceAction(userData.country));
    // dispatch(getCategoryAction());
  // }, [userData.country, userData.lang]);

  return (
    <>
      <div className="flex flex-col bg-base-100">
        <ANavbar />
        {currentPref.isVisited ? (
          <main className="">
            <AppRoutes />
          </main>
        ) : (
          <></>
        )}
      </div>
      <ADialog />
    </>
  );
}

export default App;
