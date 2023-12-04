// import { useState } from 'react';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// export default function CreateListing() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [files, setFiles] = useState([]);
//   const [formData, setFormData] = useState({
//     imageUrls: [],
//     name: '',
//     description: '',
//     address: '',
//     type: 'rent',
//     bedrooms: 1,
//     bathrooms: 1,
//     regularPrice: 50,
//     discountPrice: 0,
//     offer: false,
//     parking: false,
//     furnished: false,
//   });
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   console.log(formData);
//   const handleImageSubmit = (e) => {
//     if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
//       setUploading(true);
//       setImageUploadError(false);
//       const promises = [];

//       for (let i = 0; i < files.length; i++) {
//         promises.push(storeImage(files[i]));
//       }
//       Promise.all(promises)
//         .then((urls) => {
//           setFormData({
//             ...formData,
//             imageUrls: formData.imageUrls.concat(urls),
//           });
//           setImageUploadError(false);
//           setUploading(false);
//         })
//         .catch((err) => {
//           setImageUploadError('Image upload failed (2 mb max per image)');
//           setUploading(false);
//         });
//     } else {
//       setImageUploadError('You can only upload 6 images per listing');
//       setUploading(false);
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleRemoveImage = (index) => {
//     setFormData({
//       ...formData,
//       imageUrls: formData.imageUrls.filter((_, i) => i !== index),
//     });
//   };

//   const handleChange = (e) => {
//     if (e.target.id === 'sale' || e.target.id === 'rent') {
//       setFormData({
//         ...formData,
//         type: e.target.id,
//       });
//     }

//     if (
//       e.target.id === 'parking' ||
//       e.target.id === 'furnished' ||
//       e.target.id === 'offer'
//     ) {
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.checked,
//       });
//     }

//     if (
//       e.target.type === 'number' ||
//       e.target.type === 'text' ||
//       e.target.type === 'textarea'
//     ) {
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.imageUrls.length < 1)
//         return setError('You must upload at least one image');
//       if (+formData.regularPrice < +formData.discountPrice)
//         return setError('Discount price must be lower than regular price');
//       setLoading(true);
//       setError(false);
//       const res = await fetch('/api/listing/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           userRef: currentUser._id,
//         }),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (data.success === false) {
//         setError(data.message);
//       }
//       navigate(`/listing/${data._id}`);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };
//   return (
//     <main className='p-3 max-w-4xl mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>
//         Create a Listing
//       </h1>
//       <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
//         <div className='flex flex-col gap-4 flex-1'>
//           <input
//             type='text'
//             placeholder='Name'
//             className='border p-3 rounded-lg'
//             id='name'
//             maxLength='62'
//             minLength='10'
//             required
//             onChange={handleChange}
//             value={formData.name}
//           />
//           <textarea
//             type='text'
//             placeholder='Description'
//             className='border p-3 rounded-lg'
//             id='description'
//             required
//             onChange={handleChange}
//             value={formData.description}
//           />
//           <input
//             type='text'
//             placeholder='Address'
//             className='border p-3 rounded-lg'
//             id='address'
//             required
//             onChange={handleChange}
//             value={formData.address}
//           />
//           <div className='flex gap-6 flex-wrap'>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='sale'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.type === 'sale'}
//               />
//               <span>Sell</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='rent'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.type === 'rent'}
//               />
//               <span>Rent</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='parking'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.parking}
//               />
//               <span>Parking spot</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='furnished'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.furnished}
//               />
//               <span>Furnished</span>
//             </div>
//             <div className='flex gap-2'>
//               <input
//                 type='checkbox'
//                 id='offer'
//                 className='w-5'
//                 onChange={handleChange}
//                 checked={formData.offer}
//               />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className='flex flex-wrap gap-6'>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='bedrooms'
//                 min='1'
//                 max='10'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.bedrooms}
//               />
//               <p>Beds</p>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='bathrooms'
//                 min='1'
//                 max='10'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.bathrooms}
//               />
//               <p>Baths</p>
//             </div>
//             <div className='flex items-center gap-2'>
//               <input
//                 type='number'
//                 id='regularPrice'
//                 min='50'
//                 max='10000000'
//                 required
//                 className='p-3 border border-gray-300 rounded-lg'
//                 onChange={handleChange}
//                 value={formData.regularPrice}
//               />
//               <div className='flex flex-col items-center'>
//                 <p>Regular price</p>
//                 {formData.type === 'rent' && (
//                   <span className='text-xs'>($ / month)</span>
//                 )}
//               </div>
//             </div>
//             {formData.offer && (
//               <div className='flex items-center gap-2'>
//                 <input
//                   type='number'
//                   id='discountPrice'
//                   min='0'
//                   max='10000000'
//                   required
//                   className='p-3 border border-gray-300 rounded-lg'
//                   onChange={handleChange}
//                   value={formData.discountPrice}
//                 />
//                 <div className='flex flex-col items-center'>
//                   <p>Discounted price</p>

//                   {formData.type === 'rent' && (
//                     <span className='text-xs'>($ / month)</span>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className='flex flex-col flex-1 gap-4'>
//           <p className='font-semibold'>
//             Images:
//             <span className='font-normal text-gray-600 ml-2'>
//               The first image will be the cover (max 6)
//             </span>
//           </p>
//           <div className='flex gap-4'>
//             <input
//               onChange={(e) => setFiles(e.target.files)}
//               className='p-3 border border-gray-300 rounded w-full'
//               type='file'
//               id='images'
//               accept='image/*'
//               multiple
//             />
//             <button
//               type='button'
//               disabled={uploading}
//               onClick={handleImageSubmit}
//               className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
//             >
//               {uploading ? 'Uploading...' : 'Upload'}
//             </button>
//           </div>
//           <p className='text-red-700 text-sm'>
//             {imageUploadError && imageUploadError}
//           </p>
//           {formData.imageUrls.length > 0 &&
//             formData.imageUrls.map((url, index) => (
//               <div
//                 key={url}
//                 className='flex justify-between p-3 border items-center'
//               >
//                 <img
//                   src={url}
//                   alt='listing image'
//                   className='w-20 h-20 object-contain rounded-lg'
//                 />
//                 <button
//                   type='button'
//                   onClick={() => handleRemoveImage(index)}
//                   className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           <button
//             disabled={loading || uploading}
//             className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//           >
//             {loading ? 'Creating...' : 'Create listing'}
//           </button>
//           {error && <p className='text-red-700 text-sm'>{error}</p>}
//         </div>
//       </form>
//     </main>
//   );
// }

import { useState } from "react";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    location: "0",
    status: "0",
    propertyType: "0",
    size: 1000,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    if (
      e.target.name === "location" ||
      e.target.name === "status" ||
      e.target.name === "propertyType"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePredictPrice = async (e) => {
    e.preventDefault();
    try {
      const sellerType = 0;
      const { location, bedrooms, size, propertyType, status } = formData;

      const response = await axios.post(
        "/api/listing/predict",
        {
          location,
          bedrooms,
          size,
          propertyType,
          sellerType,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setPredictedPrice(response.data.predictedPrice);
      console.log(predictedPrice);
    } catch (error) {
      console.error("Prediction request error:", error);
    }
  };

  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Add a Property
      </h1>
      <form onSubmit={handleSubmit} className="row g-4 border m-2 rounded pb-3">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-3"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="form-control mb-3"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="form-control mb-3"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="location" className="form-label">
                  Location:
                </label>
                <select
                  className="form-select"
                  id="location"
                  name="location"
                  onChange={handleChange}
                  value={formData.location}
                >
                  <option value="0">Bangalore</option>
                  <option value="1">Chennai</option>
                  <option value="2">Delhi</option>
                  <option value="3">Hyderabad</option>
                  <option value="4">Mumbai</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="status" className="form-label">
                  Status:
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  onChange={handleChange}
                  value={formData.status}
                >
                  <option value="0">New</option>
                  <option value="1">Ready to move</option>
                  <option value="2">Resale</option>
                  <option value="3">Under Construction</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="type" className="form-label">
                  Type:
                </label>
                <select
                  className="form-select"
                  id="type"
                  name="propertyType"
                  onChange={handleChange}
                  value={formData.propertyType}
                >
                  <option value="0">Apartment</option>
                  <option value="1">Independent Floor</option>
                  <option value="2">Independent House</option>
                  <option value="3">Residential Plot</option>
                  <option value="4">Villa</option>
                </select>
              </div>
            </div>
          </div>

          {/* <label>
            Type:
            <select
              id="type"
              name="propertyType"
              onChange={handleChange}
              value={formData.propertyType}
            >
              <option value="0">Apartment</option>
              <option value="1">Independent Floor</option>
              <option value="2">Independent House</option>
              <option value="3">Residential Plot</option>
              <option value="4">Villa</option>
            </select>
          </label> */}
          {/* <div className="form-check">
            <input
              type="checkbox"
              id="sale"
              className="form-check-input"
              onChange={handleChange}
              checked={formData.type === "sale"}
            />
            <label className="form-check-label">Sell</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="rent"
              className="form-check-input"
              onChange={handleChange}
              checked={formData.type === "rent"}
            />
            <label className="form-check-label">Rent</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="parking"
              className="form-check-input"
              onChange={handleChange}
              checked={formData.parking}
            />
            <label className="form-check-label">Parking spot</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="furnished"
              className="form-check-input"
              onChange={handleChange}
              checked={formData.furnished}
            />
            <label className="form-check-label">Furnished</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="offer"
              className="form-check-input"
              onChange={handleChange}
              checked={formData.offer}
            />
            <label className="form-check-label">Offer</label>
          </div>
          <label>
            Size:
            <input
              type="number"
              id="size"
              onChange={handleChange}
              value={formData.size}
            />
          </label> */}

          <div className="container mt-4">
            <div className="d-flex flex-column gap-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="sale"
                  className="form-check-input"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <label className="form-check-label" htmlFor="sale">
                  Sell
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="rent"
                  className="form-check-input"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <label className="form-check-label" htmlFor="rent">
                  Rent
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="parking"
                  className="form-check-input"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <label className="form-check-label" htmlFor="parking">
                  Parking spot
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="furnished"
                  className="form-check-input"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <label className="form-check-label" htmlFor="furnished">
                  Furnished
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="offer"
                  className="form-check-input"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <label className="form-check-label" htmlFor="offer">
                  Offer
                </label>
              </div>
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Size (in acres):
              </label>
              <input
                type="number"
                id="size"
                className="form-control"
                onChange={handleChange}
                value={formData.size}
              />
            </div>
          </div>

          <div className="d-flex gap-3">
            <div className="d-flex align-items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="form-control"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <label className="ml-2">Beds</label>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="form-control"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <label className="ml-2">Baths</label>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="form-control"
                onChange={handleChange}
                value={formData.regularPrice}
              />

              <div className="align-items-center">
                <label>Regular price</label>
                {formData.type === "rent" && (
                  <span className="text-xs">(Rs. / month)</span>
                )}
              </div>
            </div>

            {formData.offer && (
              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="form-control"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="d-flex flex-column align-items-center">
                  <label>Discounted price</label>
                  {formData.type === "rent" && (
                    <span className="text-xs">(Rs. / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <p className="font-weight-bold mb-2">
            Images:
            <span className="font-weight-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="d-flex gap-3">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="form-control mb-2"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="btn text-light bg-success p-2 px-4 rounded"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-danger text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="d-flex justify-content-between p-3 border align-items-center my-2 rounded "
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="btn bg-danger rounded p-2 px-4"
                >
                  Delete
                </button>
              </div>
            ))}
          <br />
          <button
            disabled={loading || uploading}
            className="btn btn-primary p-2 px-4 rounded mb-2"
          >
            {loading ? "Creating..." : "Create "}
          </button>
          <br />
          <br />
          {/* <button
            className="btn btn-primary rounded"
            onClick={handlePredictPrice}
          >
            Predict Price
          </button>
          {error && <p className="text-danger text-sm">{error}</p>}
          {predictedPrice !== null && (
            <p>Estimated Price: ₹{predictedPrice.toFixed(2)} Lakhs</p>
          )} */}

          <div className="text-center mt-4">
            {formData.type !== "rent" && (
              <button
                className="btn  rounded-pill btn-lg hover:opacity-80"
                style={{ backgroundColor: "#690707", color: "white" }}
                onClick={handlePredictPrice}
              >
                <span>
                  <i className="fa fa-xing" aria-hidden="true"></i>pert price
                  prediction
                </span>
              </button>
            )}
            {error && <p className="text-danger mt-2">Error: {error}</p>}
            {predictedPrice !== null && (
              <p className="text-success mt-2">
                <br />
                <b>Estimated Price: ₹{predictedPrice.toFixed(2)} Lakhs</b>
              </p>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}
