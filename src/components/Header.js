import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "../icons";
import Button from "./Button";
import { DarkModeContext } from "./DarkMode";

function Header() {
  const { mode, toggleMode } = useContext(DarkModeContext);
  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-black">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-green-600 dark:text-green-300">
        <Link to="/">
          <p className="text-xl font-bold text-yellow-600">organize</p>
        </Link>
        <ul className="flex items-center flex-shrink-0 space-x-6 text-yellow-600 dark:text-yellow-300">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-green"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
