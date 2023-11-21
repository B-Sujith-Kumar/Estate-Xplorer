// import { FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);
//   return (
//     <header className='bg-slate-200 shadow-md'>
//       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//         <Link to='/'>
//           <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//             <span className='text-slate-500'>Sahand</span>
//             <span className='text-slate-700'>Estate</span>
//           </h1>
//         </Link>
//         <form
//           onSubmit={handleSubmit}
//           className='bg-slate-100 p-3 rounded-lg flex items-center'
//         >
//           <input
//             type='text'
//             placeholder='Search...'
//             className='bg-transparent focus:outline-none w-24 sm:w-64'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button>
//             <FaSearch className='text-slate-600' />
//           </button>
//         </form>
//         <ul className='flex gap-4'>
//           <Link to='/'>
//             <li className='hidden sm:inline text-slate-700 hover:underline'>
//               Home
//             </li>
//           </Link>
//           <Link to='/about'>
//             <li className='hidden sm:inline text-slate-700 hover:underline'>
//               About
//             </li>
//           </Link>
//           <Link to='/profile'>
//             {currentUser ? (
//               <img
//                 className='rounded-full h-7 w-7 object-cover'
//                 src={currentUser.avatar}
//                 alt='profile'
//               />
//             ) : (
//               <li className=' text-slate-700 hover:underline'> Sign in</li>
//             )}
//           </Link>
//         </ul>
//       </div>
//     </header>
//   );
// }

import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-light">
      <div className="container-fluid py-2">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <h1 className="font-bold text-sm sm:text-xl text-dark">
              <span className="text-primary">Sahand</span>
              <span className="text-secondary">Estate</span>
            </h1>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="bg-light p-3 rounded-lg d-flex align-items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus-outline-none w-100 me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <FaSearch className="text-light" />
            </button>
          </form>
          <ul className="d-flex gap-4">
            <Link to="/" className="text-decoration-none">
              <li className="d-none d-sm-inline text-dark hover-underline">
                Home
              </li>
            </Link>
            <Link to="/about" className="text-decoration-none">
              <li className="d-none d-sm-inline text-dark hover-underline">
                About
              </li>
            </Link>
            <Link to="/profile" className="text-decoration-none">
              {currentUser ? (
                <img
                  className="rounded-circle h-8 w-8 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="text-dark hover-underline">Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
