import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../Firebase'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [usePassword, setUsePassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });
  const { email, password, name } = formData;
  function textEntered(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onsubmit(e){
    e.preventDefault()
    try{
      const auth = getAuth()
      const userCredentials = await createUserWithEmailAndPassword(
        auth, email, password
      );
      updateProfile(auth.currentUser,{
        displayName:name
      })
      const user = userCredentials.user
      const formDataCopy = {...formData}
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc( doc(db, "users", user.uid), formDataCopy)
      toast.success('You register successfully')
      navigate('/')
    }catch(error){
       toast.error("Something Went Wrong")
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center font-bold mt-4">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl m-auto">
        <div className="lg:w-[50%] mb:w-[67%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onsubmit}>
            <input
              type="text"
              id="name"
              onChange={textEntered}
              value={name}
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
              placeholder="Full Name"
            />
            <input
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={textEntered}
            />
            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
                type={usePassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={textEntered}
              />
              {usePassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setUsePassword(!usePassword)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setUsePassword(!usePassword)}
                />
              )}
            </div>
            <div className="flex justify-between flex-wrap whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Have a account?
                <Link
                  to="/SignIn"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  SignIn
                </Link>
              </p>
              <p>
                <Link
                  to="/ForgotPassword"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-4 py-3 font-medium uppercase shadow-md hover:bg-blue-700 rounded transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign Up
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
