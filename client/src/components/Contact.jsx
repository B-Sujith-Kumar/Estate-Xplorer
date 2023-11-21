// // import { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';

// // export default function Contact({ listing }) {
// //   const [landlord, setLandlord] = useState(null);
// //   const [message, setMessage] = useState('');
// //   const onChange = (e) => {
// //     setMessage(e.target.value);
// //   };

// //   useEffect(() => {
// //     const fetchLandlord = async () => {
// //       try {
// //         const res = await fetch(`/api/user/${listing.userRef}`);
// //         const data = await res.json();
// //         setLandlord(data);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //     fetchLandlord();
// //   }, [listing.userRef]);
// //   return (
// //     <>
// //       {landlord && (
// //         <div className='flex flex-col gap-2'>
// //           <p>
// //             Contact <span className='font-semibold'>{landlord.username}</span>{' '}
// //             for{' '}
// //             <span className='font-semibold'>{listing.name.toLowerCase()}</span>
// //           </p>
// //           <textarea
// //             name='message'
// //             id='message'
// //             rows='2'
// //             value={message}
// //             onChange={onChange}
// //             placeholder='Enter your message here...'
// //             className='w-full border p-3 rounded-lg'
// //           ></textarea>

// //           <Link
// //           to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
// //           className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
// //           >
// //             Send Message
// //           </Link>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Contact({ listing }) {
//   const [landlord, setLandlord] = useState(null);
//   const [message, setMessage] = useState("");

//   const onChange = (e) => {
//     setMessage(e.target.value);
//   };

//   useEffect(() => {
//     const fetchLandlord = async () => {
//       try {
//         const res = await fetch(`/api/user/${listing.userRef}`);
//         const data = await res.json();
//         setLandlord(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchLandlord();
//   }, [listing.userRef]);

//   return (
//     <>
//       {landlord && (
//         <div className="container mt-4">
//           <p>
//             Contact{" "}
//             <span className="font-weight-bold">{landlord.username}</span> for{" "}
//             <span className="font-weight-bold">
//               {listing.name.toLowerCase()}
//             </span>
//           </p>
//           <textarea
//             name="message"
//             id="message"
//             rows="2"
//             value={message}
//             onChange={onChange}
//             placeholder="Enter your message here..."
//             className="form-control mt-2"
//           ></textarea>

//           <Link
//             to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
//             className="btn btn-primary mt-2"
//           >
//             Send Message
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="container mt-4">
          <p>
            Contact <span className="fw-bold">{landlord.username}</span> for{" "}
            <span className="fw-bold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="form-control mt-2"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="btn btn-primary mt-2"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "#007bff",
              borderColor: "#007bff",
            }}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
