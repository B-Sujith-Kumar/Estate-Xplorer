
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
    <header className="" style={{ backgroundColor: "#690707" }}>
      <div className="container-fluid py-2">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            {/* <h1 className="font-bold text-sm sm:text-xl text-dark">
              <span className="text-light">Estate</span>
              <span className="text fw-bolder fs-3" style={{color:"gray"}}>X</span>
              <span className="text-light">plorer</span>
            </h1> */}
            <img
              src="./../../public/pictures/logo.png"
              style={{ width: "200px" }}
            ></img>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="bg-transparent  rounded-lg d-flex align-items-center p-1"
          >
            <input
              type="text"
              placeholder="Search..."
              className="text-light focus-outline-none w-100 me-2 p-2 border-light"
              style={{ background: "#690707" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className=" p-2 border-none">
              <FaSearch className="text-light" />
            </button>
          </form>
          <ul className="d-flex gap-4">
            <Link to="/" className="text-decoration-none">
              <li className="d-none d-sm-inline text-light hover-underline">
                Home
              </li>
            </Link>
            <Link to="/about" className="text-decoration-none">
              <li className="d-none d-sm-inline text-light hover-underline">
                About
              </li>
            </Link>
            <Link to="/profile" className="text-decoration-none">
              {currentUser ? (
                // <img
                //   className="rounded-circle h-8 w-8 object-cover"
                //   src={currentUser.avatar}
                //   alt="profile"
                // />
                <i
                  className="fa fa-user text-light me-2"
                  aria-hidden="true"
                ></i>
              ) : (
                <li className="text-light hover-underline">Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
