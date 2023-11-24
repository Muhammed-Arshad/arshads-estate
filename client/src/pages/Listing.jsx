import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Listing() {

    const params = useParams();

    const [listing,setListing] = useState(null)

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState(false)

    useEffect(()=> {
        const fetchListing = async () => {

            try{

                setLoading(true);

                const res = await fetch('/api/listing/get/'+params.listingId);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
            }catch(e){
                setLoading(false);
                setError(true)
            }
        };

        fetchListing();
    },[])


    return (
        <div>Lsiting</div>
    )
}

export default Listing
