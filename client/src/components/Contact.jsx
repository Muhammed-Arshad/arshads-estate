import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landroad, setLandroad] = useState(null);

  useEffect(() => {
    const fetchLandroad = async () => {
      try {
        const res = await fetch("/api/user/" + listing.userRef);

        const data = await res.json();

        setLandroad(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchLandroad();
  }, [listing.userRef]);

  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landroad && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landroad.username}</span>{" "}
            for <span>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link to={`mailto:${landroad.email}?subject=Regrding ${listing.name}&body=${message}`}
           className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95">
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
