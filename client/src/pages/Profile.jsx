/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div
        className="container p-3 border border-dark rounded mt-20 "
        style={{ maxWidth: "768px" }}
      >
        <h1 className="text-3xl font-semibold text-center my-7">
          <i className="fa fa-user" aria-hidden="true"></i> Profile
        </h1>
        <form onSubmit={handleSubmit} className="row g-4">
          <div className="col-md-4">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded  h-40 w-40 border object-cover cursor-pointer mx-auto d-block mt-2"
            />
            <p className="text-sm text-center">
              {fileUploadError ? (
                <span className="text-danger">
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-primary">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-success">
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="col-md-8">
            <input
              type="text"
              placeholder="Username"
              defaultValue={currentUser.username}
              id="username"
              className="form-control my-2"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              defaultValue={currentUser.email}
              className="form-control my-2"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              id="password"
              className="form-control my-2"
            />
            {/* <div className="d-flex">
            <button disabled={loading} className="btn btn-primary me-2 mt-2">
              {loading ? "Loading..." : "Update"}
            </button>
            <Link className="btn btn-success mt-2 ms-2" to={"/create-listing"}>
              Create Listing
            </Link>
            <button
              onClick={handleSignOut}
              className="btn btn-danger ms-2 mt-2"
            >
              Sign out
            </button>
          </div> */}
            <div className="d-flex">
              <button
                disabled={loading}
                className="btn btn-primary me-2 mt-2 hover:opacity-80"
                style={{ backgroundColor: "#004080" }}
              >
                {loading ? "Loading..." : "Update"}
              </button>
              <Link
                className="btn btn-success mt-2 ms-2 hover:opacity-80"
                to={"/create-listing"}
                style={{ backgroundColor: "#006600" }}
              >
                Add a Property
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-danger ms-2 mt-2 hover:opacity-80"
                style={{ backgroundColor: "#990000" }}
              >
                Sign out
              </button>
            </div>
          </div>
        </form>

        <p className="text-danger mt-4">{error ? error : ""}</p>
        <p className="text-success mt-4">
          {updateSuccess ? "User is updated successfully!" : ""}
        </p>
      </div>
      <center className="mb-10">
        <div>
          <button
            onClick={handleShowListings}
            className="btn text-light  mt-4 hover:opacity-80"
            style={{ backgroundColor: "#690707" }}
          >
            <i className="fa fa-xing" aria-hidden="true"></i>plore properties
          </button>
          <p className="text-danger mt-4">
            {showListingsError ? "Error showing listings" : ""}
          </p>

          {userListings && userListings.length > 0 && (
            <div
              className="flex flex-col gap-4 mt-4"
              style={{ maxWidth: "768px" }}
            >
              <h1 className="text-center text-2xl font-semibold">
                Your Listings
              </h1>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-lg p-3 d-flex justify-content-between align-items-center gap-4"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                  <Link
                    className="text-primary font-semibold hover:underline truncate flex-1"
                    to={`/listing/${listing._id}`}
                  >
                    <p>
                      <i className="fa fa-xing" aria-hidden="true"></i>plore :{" "}
                      {listing.name}
                    </p>
                  </Link>

                  <div className="d-flex flex-col item-center">
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="text-danger uppercase"
                    >
                      Delete
                    </button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="text-success uppercase">Edit</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </center>
    </div>
  );
}
