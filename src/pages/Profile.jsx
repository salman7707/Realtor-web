import React, { useEffect } from "react";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changeDetail, setchangeDetail] = useState(false);
  const navigate = useNavigate();
  const [formdata, setfromdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formdata;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  function onchange(e) {
    setfromdata((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "User", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Your changes are successfully done");
    } catch (error) {
      toast.error("Could not update the profie details");
    }
  }
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  async function onDelete(listingId){
      if(window.confirm("Are you sure you want to delete?")){
         await deleteDoc(doc(db,"listings",listingId))
         const updateListings = listings.filter(
          (listing) => listing.id !== listingId
         )
         setListings(updateListings);
         toast.success("Successfully deleted the listing")
      }
  }
  function onEdit(listingId){
    navigate(`/edit-listing/${listingId}`)
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex items-center flex-col">
        <h1 className="text-xl md:text-3xl mt-4 text-center font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-4 px-2 py-4">
          <form>
            <input
              style={
                changeDetail ? { backgroundColor: "rgb(254, 202, 202)" } : {}
              }
              className="w-full rounded py-2 px-4 text-[15px] md:text-xl text-gray-700 mb-6 bg-white border border-gray-300 transition ease-in-out"
              disabled={!changeDetail}
              type="text"
              id="name"
              onChange={onchange}
              value={name}
            />
            <input
              className="w-full rounded py-2 px-4 text-[15px] md:text-xl text-gray-700 mb-6 bg-white border border-gray-300 transition ease-in-out"
              type="text"
              id="email"
              value={email}
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Do You Want To Change Your Name?
                <span
                  className="text-red-600 hover:text-red-700 cursor-pointer transition ease-in-out duration-200 ml-1"
                  onClick={() => {
                    changeDetail && onSubmit();
                    setchangeDetail(!changeDetail);
                  }}
                >
                  {changeDetail ? "Apply Change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 cursor-pointer transition ease-in-out duration-200"
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/Createlisting"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={()=>onDelete(listing.id)}
                  onEdit={()=>onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
