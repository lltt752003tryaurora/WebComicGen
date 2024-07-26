import { message } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../util/fetchFromAPI";

export function SignUpComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      displayName: "",
      avatar: null,
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);
        formData.append("displayName", values.displayName);
        if (values.avatar) {
          formData.append("File", values.avatar, values.avatar.name);
        }

        // Log formData entries
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Make the API call
        await signup(formData);

        messageApi.success("Signup successful!");
        setTimeout(() => {
          navigate("/log-in");
        }, 1000);
      } catch (error) {
        let errorMessage = error.response?.data?.message || "Sign Up failed";
        if (error.response?.status === 409) {
          errorMessage = "Username already exists";
        }
        messageApi.error(errorMessage);
      }
    },
  });

  const { handleSubmit, handleChange, values, handleBlur, setFieldValue } =
    formik;

  const handleAvatarChange = (event) => {
    console.log(event.target.files);
    setFieldValue("avatar", event.currentTarget.files[0]);
  };
  return (
    <>
      {contextHolder}
      <section className="dark:bg-slate-400 w-full">
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
              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-2">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label
                    htmlFor="displayName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="avatar"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleAvatarChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600   
 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="relative md:col-span-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
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
                      <i className="fa-regular fa-eye hover:text-green-500 transition-all ease-in"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash hover:text-red-500 transition-all ease-in"></i>
                    )}
                  </div>
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
    </>
  );
}
