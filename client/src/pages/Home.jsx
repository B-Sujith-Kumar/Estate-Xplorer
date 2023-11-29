// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import SwiperCore from 'swiper';
// import 'swiper/css/bundle';
// import ListingItem from '../components/ListingItem';

// export default function Home() {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);
//   SwiperCore.use([Navigation]);
//   console.log(offerListings);
//   useEffect(() => {
//     const fetchOfferListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?offer=true&limit=4');
//         const data = await res.json();
//         setOfferListings(data);
//         fetchRentListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const fetchRentListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?type=rent&limit=4');
//         const data = await res.json();
//         setRentListings(data);
//         fetchSaleListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchSaleListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?type=sale&limit=4');
//         const data = await res.json();
//         setSaleListings(data);
//       } catch (error) {
//         log(error);
//       }
//     };
//     fetchOfferListings();
//   }, []);
//   return (
//     <div>
//       {/* top */}
//       <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
//         <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
//           Find your next <span className='text-slate-500'>perfect</span>
//           <br />
//           place with ease
//         </h1>
//         <div className='text-gray-400 text-xs sm:text-sm'>
//           Sahand Estate is the best place to find your next perfect place to
//           live.
//           <br />
//           We have a wide range of properties for you to choose from.
//         </div>
//         <Link
//           to={'/search'}
//           className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
//         >
//           Let's get started...
//         </Link>
//       </div>

//       {/* swiper */}
//       <Swiper navigation>
//         {offerListings &&
//           offerListings.length > 0 &&
//           offerListings.map((listing) => (
//             <SwiperSlide>
//               <div
//                 style={{
//                   background: `url(${listing.imageUrls[0]}) center no-repeat`,
//                   backgroundSize: 'cover',
//                 }}
//                 className='h-[500px]'
//                 key={listing._id}
//               ></div>
//             </SwiperSlide>
//           ))}
//       </Swiper>

//       {/* listing results for offer, sale and rent */}

//       <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
//         {offerListings && offerListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
//               <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {offerListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {rentListings && rentListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
//               <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {rentListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {saleListings && saleListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
//               <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {saleListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import "./Home.css";
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <center>
      <div className="container-fluid px-4 py-5">
        
        <h1 className="text-dark fw-bold fs-3 fs-lg-5 mt-4">
        Find your dream home , <br />
          
           {/* <img src="./../../public/pictures/logo3.png" style={{width:"40px"}}></img>  */}
        </h1>
        <h1 className="text-dark fw-bold fs-3 fs-lg-5 mb-4">
        <span className="text_1" style={{color:"#690707"}}>live your dream life</span>
           <span className="text_2" style={{color:"#690707"}}>with Estate<i className="fa fa-xing" aria-hidden="true"></i>plorer</span>
        </h1>
        
        <div  className="text-muted fs-6 mb-4">
          Navigating Dreams to Reality.
          <br />
          Your trusted partner in finding and securing the perfect property.
          <br/>
          where every space tells a unique story of home.
        </div>
        
        <Link
          to={"/search"}
          className="btn btn-outline-dark fs-6 fw-bold text-decoration-none"
        >
          Let&apos;s get started...
        </Link>
      </div>
      </center>
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  // backgroundSize: "cover",
                }}
                className="h-500px"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale, and rent */}
      <div className="container px-4 py-3">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <center className="my-4">
              <h2 className="text-2xl fw-bolder text-dark">
                Latest Offers
              </h2>
              <Link className="text-sm text-link fw-bolder" to={"/search?offer=true"}>
              <span style={{color:"#690707"}}><i className="fa fa-xing" aria-hidden="true"></i>plore</span> more
              </Link>
              </center>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
            <center className="my-8">
              <h2 className="text-2xl fw-bolder text-dark">
                Latest places for rent
              </h2>
              <Link className="text-sm text-link fw-bolder" to={"/search?type=rent"}>
              <span style={{color:"#690707"}}><i className="fa fa-xing" aria-hidden="true"></i>plore</span> more
              </Link>
              </center>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
            <center className="my-4">
              <h2 className="text-2xl fw-bolder text-dark ">
                Latest places for sale
              </h2>
              <Link className="text-sm text-link fw-bolder" to={"/search?type=sale"}>
              <span style={{color:"#690707"}}><i className="fa fa-xing" aria-hidden="true"></i>plore</span> more
              </Link>
              </center>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
