import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router";

export default function Oauth() {
  const navigate = useNavigate()
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const credentials = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, credentials)
      const user = result.user
      const docRef = doc(db ,"users", user.uid)
      const docSnap = await getDoc(docRef)
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/")
    } catch (error) {
      toast.error('Could not authorized with google')
    }
  }
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex justify-center items-center w-full text-white uppercase text-center font-medium bg-red-600 py-3 rounded shadow-md hover:shadow-lg hover:bg-red-700 transition duration-150 ease-in-out active:bg-red-800 px-4"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue With Google
    </button>
  );
}
