/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';
// import { MdLocationOn } from 'react-icons/md';

// export default function ListingItem({ listing }) {
//   return (
//     <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
//       <Link to={`/listing/${listing._id}`}>
//         <img
//           src={
//             listing.imageUrls[0] ||
//             'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
//           }
//           alt='listing cover'
//           className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
//         />
//         <div className='p-3 flex flex-col gap-2 w-full'>
//           <p className='truncate text-lg font-semibold text-slate-700'>
//             {listing.name}
//           </p>
//           <div className='flex items-center gap-1'>
//             <MdLocationOn className='h-4 w-4 text-green-700' />
//             <p className='text-sm text-gray-600 truncate w-full'>
//               {listing.address}
//             </p>
//           </div>
//           <p className='text-sm text-gray-600 line-clamp-2'>
//             {listing.description}
//           </p>
//           <p className='text-slate-500 mt-2 font-semibold '>
//             $
//             {listing.offer
//               ? listing.discountPrice.toLocaleString('en-US')
//               : listing.regularPrice.toLocaleString('en-US')}
//             {listing.type === 'rent' && ' / month'}
//           </p>
//           <div className='text-slate-700 flex gap-4'>
//             <div className='font-bold text-xs'>
//               {listing.bedrooms > 1
//                 ? `${listing.bedrooms} beds `
//                 : `${listing.bedrooms} bed `}
//             </div>
//             <div className='font-bold text-xs'>
//               {listing.bathrooms > 1
//                 ? `${listing.bathrooms} baths `
//                 : `${listing.bathrooms} bath `}
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (<div className="p-2" >
    <div className="card bg-white shadow-md hover-shadow-lg   transition-shadow overflow-hidden rounded-lg spac sm:w-330 pb-4"  style={{
    border: "2px solid gray",
    transition: "transform 0.4s ease-in-out",
    height:"400px" // Specify the transition property
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "scale(1.04)"; // Increase size on hover
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "scale(1)"; // Reset size on hover out
  
  }}>
      <Link to={`/listing/${listing._id}`} className="text-decoration-none">
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="card-img-top h-320 sm:h-220 w-full object-cover hover-scale-105 transition-scale-300 p-2  rounded" style={{height: "220px"}}
        />
        <div className="card-body p-3 d-flex flex-column gap-2 w-full">
          <p className="card-title h5 fw-bold text-slate-700">{listing.name}</p>
          <div className="d-flex align-items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="card-text text-sm text-gray-600 truncate w-100">
              {listing.address}
            </p>
          </div>
          {/* <p className="card-text text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p> */}
          <p className="card-text text-slate-500 mt-2 fw-bold ">
            Rs. 
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 d-flex gap-4">
            <div className="fw-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="fw-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
    </div>
  );
}
