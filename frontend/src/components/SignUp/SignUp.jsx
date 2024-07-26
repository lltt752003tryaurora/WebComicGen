import { useState } from "react";
import { Link } from "react-router-dom";

export function SignUpComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  return (
    <section className="dark:bg-slate-400">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to={"/"}
          className="flex items-center mb-2 text-2xl font-semibol text-white"
        >
          <i className="fa-solid fa-diagram-project text-black hover:text-slate-600  duration-100">
            <span> Comic Gen</span>
          </i>
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-1 md:space-y-3 sm:p-8 shadow-2xl">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form onSubmit={"handleSubmit"} className="space-y-2 md:space-y-2">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@email.com"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                />
                {/* {touched.email && errors.email ? (
                  <p className="text-red-500">{errors.email}</p>
                ) : null} */}
              </div>
              <div className="flex gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                  {/* {touched.name && errors.name ? (
                    <p className="text-red-500">{errors.name}</p>
                  ) : null} */}
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="phoneNumber"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Phone number"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                  {/* {touched.phoneNumber && errors.phoneNumber ? (
                    <p className="text-red-500">{errors.phoneNumber}</p>
                  ) : null} */}
                </div>
              </div>

              <div className="relative md:col-span-5">
                <label
                  htmlFor="passWord"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="passWord"
                  id="passWord"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative z-0"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                />
                <div
                  className="absolute top-9 right-4 cursor-pointer z-10"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye hover:text-green-500 transition-all ease-in"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash hover:text-red-500 transition-all ease-in"></i>
                  )}
                </div>
                {/* {touched.passWord && errors.passWord ? (
                  <p className="text-red-500">{errors.passWord}</p>
                ) : null} */}
              </div>
              <div className="relative md:col-span-5">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative z-0"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                />
                <div
                  className="absolute top-9 right-4 cursor-pointer z-10"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
                    <i className="fa-regular fa-eye hover:text-green-500 transition-all ease-in"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash hover:text-red-500 transition-all ease-in"></i>
                  )}
                </div>
                {/* {touched.confirmPassword && errors.confirmPassword ? (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                ) : null} */}
              </div>

              <div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      checked={terms}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // onClick={() => {
                      //   setTerms(!terms);
                      // }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the <span> </span>
                      <span>
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500"
                          href="https://www.facebook.com/truongthinh752003"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Terms and Conditions
                        </a>
                      </span>
                    </label>
                  </div>
                </div>
                {/* {touched.terms && errors.terms ? (
                  <div className="text-red-500">{errors.terms}</div>
                ) : null} */}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800 ease-in duration-300"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?<span> </span>
                <Link
                  to={"/log-in"}
                  className="font-medium text-primary-600 underline dark:text-primary-500 hover:text-green-400 duration-300"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
