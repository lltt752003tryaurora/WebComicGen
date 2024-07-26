import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { message } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../util/fetchFromAPI.js";

export function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await login(values.username, values.password);
        console.log(data);
        messageApi.success("Login successful");
        // saveLocalStore(USER_LOGIN, res.data.content);
        // saveLocalStore(TOKEN, res.data.content.accessToken);
        setTimeout(() => {
          navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
          // window.location.reload(true); // Không cần thiết nếu bạn dùng Redux để quản lý state
        }, 2000); // Đợi 2 giây trước khi chuyển hướng
      } catch (error) {
        messageApi.error("Login failed");
      }
    },
  });
  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    formik;
  return (
    <>
      {contextHolder}
      <section className="dark:bg-brown-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to={"/"}
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            rel="noreferrer"
          >
            <i className="fa-solid fa-diagram-project text-white hover:text-slate-500 hover:underline">
              Comic Gen
            </i>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 border-amber-600 shadow-2xl">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in with your username
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <i className="fa-regular fa-user"></i>
                    <span className="text-base"> Username</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter the email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="md:col-span-5 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <i className="fa-solid fa-lock"></i>
                    <span className="text-base"> Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative z-0"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div
                    className="absolute top-9 right-4 cursor-pointer z-10"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <i class="fa-regular fa-eye hover:text-green-500 transition-all ease-in"></i>
                    ) : (
                      <i class="fa-regular fa-eye-slash hover:text-red-500 transition-all ease-in"></i>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800 ease-in duration-300"
                >
                  Sign in
                </button>
                <p className="text-sm font-medium text-white">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/sign-up"}
                    className="font-medium text-primary-600 underline dark:text-primary-500 hover:text-green-300 duration-100"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
