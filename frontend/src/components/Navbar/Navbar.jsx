import { useAuthContext } from "@/hooks/useAuthContext";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useAuthContext();
  return (
    <header className="shadow  z-50 top-0 fixed t-0 l-0 w-full z-10">
      <nav className="bg-slate-300 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <i class="fa-solid fa-book-open-reader dark:text-white mr-2"></i>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Comic Gen
            </span>
          </Link>
          {!user ? (
            <div className="flex items-center lg:order-2">
              <Link
                to="/log-in"
                className="text-gray-800 bg-gray-200 dark:text-white hover:text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="text-gray-800 bg-gray-200 dark:text-white hover:text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Sign up
              </Link>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
