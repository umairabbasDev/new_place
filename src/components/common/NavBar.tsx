import { useTheme, useNavigateWithParams } from "../../hooks";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  const [searchParams] = useSearchParams();
  const q: string = searchParams.get("q") || "";
  const [query, setQuery] = useState<string>(q);
  const [currentTheme, changeTheme] = useTheme("system");

  const navigate = useNavigateWithParams();

  const navigateHandler = () => navigate("search", { q: query });

  const handleThemeToggle = (e: any) => {
    console.log("e", e.target.value);
    const newTheme = currentTheme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  function handleEnterKeyDown(event: any) {
    if (event.key === "Enter") {
      navigateHandler();
    }
  }

  return (
    <>
      <div className="navbar bg-base-300 mb-10 justify-between">
        <div className="navbar-start lg:block hidden">
          {/* <ul
          tabIndex={0}
          className=" flex flex-row menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-52"
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul> */}
        </div>

        <div className="navbar-center">
          <Link to="/">
            <img
              src={
                currentTheme === "dark"
                  ? "/assets/new-place-white.png"
                  : "/assets/new-place-black.png"
              }
              alt="main-logo"
              className="w-20 "
            />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="form-control sm:block hidden">
            <input
              id="search"
              type="text"
              placeholder="e.g: 'politics' "
              className="input input-bordered w-28 md:w-auto"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={handleEnterKeyDown}
            />
          </div>

          <label className="swap swap-rotate p-5">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value={currentTheme}
              onClick={handleThemeToggle}
            />

            {/* sun icon */}
            {currentTheme == "light" ? (
              <SunIcon className="swap-of  w-8 h-8  text-yellow-500" />
            ) : (
              <MoonIcon className="swap-of  w-8 h-8" />
            )}
          </label>
          <label className="swap swap-rotate sm:pe-0 pe-5">
            <Cog6ToothIcon
              onClick={() => {
                (document.getElementById("feed_modal") as any).showModal();
              }}
              className="w-8 h-8"
            />
          </label>
          <div className="dropdown dropdown-left dropdown-bottom sm:hidden block">
            <MagnifyingGlassIcon tabIndex={0} className="w-8 h-8" />
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <div className="form-control w-full">
                <input
                  id="search"
                  type="text"
                  value={query}
                  placeholder="e.g: 'politics' "
                  className="input input-bordered w-full"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
