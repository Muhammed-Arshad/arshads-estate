import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {useSelector} from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Contact from "../components/Contact";

function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();

  const [listing, setListing] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [contact, setContact] = useState(false);

  const {currentUser} = useSelector((state)=> state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/listing/get/" + params.listingId);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {listing && !loading && !error && (
        <div className="">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col p-10 ">
          <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
            {listing.address}
          </p>
          <div className="flex gap-4">
            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              {listing.type === "rent" ? "For rent" : "For sale"}
            </p>
            {listing.offer && (
              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                ${+listing.regularPrice - +listing.discountPrice}
              </p>
            )}
          </div>
          <p className="text-slate-800">
            <span className="font-semibold text-black">Description - </span>
            {listing.description}
          </p>

          {currentUser && listing.userRef !== currentUser._id && !contact && (
            <button onClick={()=>setContact(true)} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
              Contact Landboard
            </button>
         )}

          {contact && <Contact listing = {listing}/>}
          </div>
    
        </div>
      )}
    </main>
  );
}

export default Listing;
