import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "./Listing.css";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

const status = {
  0: "New",
  1: "Ready to move",
  2: "Resale",
  3: "Under construction",
};
const propertyType = {
  0: "Apartment",
  1: "Independent Floor",
  2: "Independent House",
  3: "Residential Plot",
  4: "Villa",
};
export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        console.log(data);
        setListing(data);

        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="p-4 border-rounded ">
      {loading && <p className="text-center my-7 fs-4">Loading...</p>}
      {error && <p className="text-center my-7 fs-4">Something went wrong!</p>}
      {listing && !loading && !error && (
        <div id="ind-container" className=" mt-20">
          <div
            id="carouselExampleIndicators"
            className="carousel slide ps-12 mt-8"
            style={{ width: "65%" }}
          >
            <div className="carousel-indicators">
              {listing.imageUrls.map((url, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {listing.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div
                    className="h-[30rem] carousel-image"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="ps-4">
            <div className="fixed top-13 start-3 z-10 border rounded-circle w-12 h-12 d-flex justify-content-center align-items-center bg-slate-100 cursor-pointer">
              <FaShare
                className=""
                style={{ color: "#690707" }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p
                className=" text-light fixed top-23 start-5 z-10 rounded-md p-2"
                style={{ backgroundColor: "#690707" }}
              >
                Link copied!
              </p>
            )}
            <div className="d-flex flex-column max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="fs-4 font-semibold">
                {listing.name} - Rs.{" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-IN")
                  : listing.regularPrice.toLocaleString("en-IN")}
                {listing.type === "rent" && " / month"}
              </p>
              <p className="d-flex align-items-center mt-2 gap-2 text-slate-600  fs-6">
                <FaMapMarkerAlt
                  className="fa-2x m-2"
                  style={{ color: "#006600" }}
                />
                {listing.address}
              </p>
              <div className="d-flex gap-4">
                <p className="btn bg-light text-danger border-danger p-2 px-4 max-w-200  text-center p-1 rounded-md fw-bolder mb-3">
                  <i className="fa fa-bullhorn" aria-hidden="true"></i>{" "}
                  {listing.type === "rent" ? " * For Rent" : " * For Sale"}
                </p>
                {listing.offer && (
                  // <p
                  // className="  p-2 px-4 py-1 max-w-200 text-white text-center p-1 rounded-md"
                  // style={{ backgroundColor: "#006600" }}
                  // >
                  <p
                    className="btn  text-light p-2 px-4 max-w-200  text-center p-1 rounded-md fw-bolder mb-3"
                    style={{ backgroundColor: "#006600" }}
                  >
                    <span>
                      Rs.{" "}
                      {(
                        +listing.regularPrice - +listing.discountPrice
                      ).toLocaleString("en-IN")}{" "}
                      OFF
                    </span>
                  </p>
                )}
              </div>
              <ul className="text-success font-semibold fs-6 d-flex flex-wrap align-items-center gap-10 sm-gap-6 mb-2">
                <li className="d-flex align-items-center gap-1 whitespace-nowrap">
                  <i
                    className="fa fa-signal fa-2x"
                    aria-hidden="true"
                    style={{ color: "#006600" }}
                  ></i>
                  <span>{status[listing.status]}</span>
                </li>
                <li className="d-flex align-items-center gap-1 whitespace-nowrap">
                  <i
                    className="fa fa-home fa-2x"
                    aria-hidden="true"
                    style={{ color: "#006600" }}
                  ></i>
                  <span>{propertyType[listing.propertyType]}</span>
                </li>
                <li className="d-flex align-items-center gap-1 whitespace-nowrap">
                  <i
                    className="fa fa-area-chart fa-2x"
                    style={{ color: "#006600" }}
                    aria-hidden="true"
                  ></i>
                  <span>{listing.size} sqft</span>
                </li>
              </ul>
              <ul className="text-success font-semibold fs-6 d-flex flex-wrap align-items-center gap-9 sm-gap-6">
                <li className="d-flex align-items-center gap-1 whitespace-nowrap ">
                  <FaBed
                    className="text-lg fa-2x"
                    style={{ color: "#006600" }}
                  />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </li>
                <li className="d-flex align-items-center gap-1 whitespace-nowrap ">
                  <FaBath
                    className="text-lg fa-2x"
                    style={{ color: "#006600" }}
                  />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li>
                <li className="d-flex align-items-center gap-1 whitespace-nowrap ">
                  <FaParking
                    className="text-lg fa-2x"
                    style={{ color: "#006600" }}
                  />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="d-flex align-items-center gap-1 whitespace-nowrap ">
                  <FaChair
                    className="text-lg fa-2x"
                    style={{ color: "#006600" }}
                  />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(!contact)}
                    className="bg-dark text-white rounded-lg  hover-opacity-95 p-2"
                    style={{ width: "40%" }}
                  >
                    <i className="fa fa-phone me-2" aria-hidden="true"></i>{" "}
                    Contact landlord
                  </button>
                )}
              {contact && (
                <button
                  onClick={() => setContact(!contact)}
                  className="bg-dark text-white rounded-lg  hover-opacity-95 p-2"
                  style={{ width: "20%" }}
                >
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                  &nbsp;&nbsp;Close
                </button>
              )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
          {/* <p className="text-slate-800">
            <span className="font-semibold text-black">Description - </span>
            {listing.description}
          </p> */}
        </div>
      )}
      {listing && !loading && !error && (
        <div className="p-12">
          <span
            className="font-bold  fs-2"
            style={{ color: "#690707", textTransform: "uppercase" }}
          >
            Description{" "}
          </span>
          <br />
          <div className="mt-4 fs-5" style={{ lineHeight: "1.8" }}>
            {listing.description}
          </div>
        </div>
      )}
    </main>
  );
}
