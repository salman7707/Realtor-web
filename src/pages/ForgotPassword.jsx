import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Oauth from "../components/Oauth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  function textEntered(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth= getAuth()
      const resetPassword = await sendPasswordResetEmail(auth, email)
      toast.success("Email send successfully")
    } catch (error) {
      toast.error("Something wants wrong to send email")
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center font-bold mt-4">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl m-auto">
        <div className="lg:w-[50%] mb:w-[67%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={textEntered}
            />
            <div className="flex justify-between flex-wrap whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have a account?
                <Link
                  to="/SignUp"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/SignIn"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign In Instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-4 py-3 font-medium uppercase shadow-md hover:bg-blue-700 rounded transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Send Reset Password
            </button>
            <div className="flex my-4 items-center before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300 ">
              <p className="font-semibold text-center mx-4">OR</p>
            </div>
            <Oauth />
          </form>
        </div>
      </div>
    </section>
  );
}
