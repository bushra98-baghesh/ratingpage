import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
function ProductRate({ product }) {
  const [rate, setRate] = useState(1);
  const handleRateChange = (newRating) => {
    setRate(newRating);

    // Send the new rating to the API
    axios
      .post("https://api.foody.gomaplus.tech/api/rating/products/add", {
        value: newRating,
        product_id: product.id, // Replace 'product.id' with the correct ID source
      })
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log("Rating submitted successfully");
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error submitting rating:", error);
      });
  };
  return (
    <div className=" flex items-center justify-between  p-3  gap-4 ">
      <div className="rounded-xl  hover:scale-110 transition-all duration-300 ease-in-out  overflow-hidden">
        <img
          src={product.image}
          alt="img"
          className=" w-24 h-28  object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-6">
        <h1
          className={`text-black font-semibold 
       text-base `}
        >
          {product.name}
        </h1>

        <StarRatings
          rating={rate} // Use the state variable here
          changeRating={(newRating) => handleRateChange(newRating)} // Update the state on rating change
          numberOfStars={5}
          starDimension="18px"
          starSpacing="1px"
          starRatedColor="#FFC700"
          starHoverColor="#FFC700"
        />
      </div>
    </div>
  );
}

export default ProductRate;
