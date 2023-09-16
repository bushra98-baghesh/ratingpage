import React, { useEffect, useState } from "react";
import ProductRate from "../components/ProductRate";
import StarRatings from "react-star-ratings";
import axios from "axios";
function RatingPage() {
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState();
  const [feedback, setFeedback] = useState(""); // State for feedback
  const [serviceRate, setServiceRate] = useState(1);
  const [Rate, setRate] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.foody.gomaplus.tech/api/cart/showToRate/${orderId}`
        );
        setProducts(response.data.data.products);
        console.log(response.data.data.id);
        setOrderId(response.data.data.id);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async () => {
    try {
      await axios.post(
        `https://api.foody.gomaplus.tech/api/rating/service/add/${orderId}`,
        {
          feedback: feedback,
          serviceRate: serviceRate,
        }
      );
    } catch (error) {
      console.error("Error posting data to the API:", error);
    }
  };
  return (
    <div className=" bg-white mx-auto  max-w-3xl space-y-4 min-h-screen py-10 px-6 ">
      <h1 className="text-2xl tracking-widest font-semibold text-[#C4C4C4] pb-10">
        We appreciate your feedback
      </h1>
      <div className=" text-start ">
        <h1 className="text-[#C4C4C4] font-medium text-base">Service Rate </h1>
        <div className="flex items-center justify-center">
          <StarRatings
            rating={serviceRate} // Use the state variable here
            changeRating={(newRating) => setServiceRate(newRating)} // Update the state on rating change
            numberOfStars={5}
            starDimension="30px"
            starSpacing="1px"
            starRatedColor="#FFC700"
            starHoverColor="#FFC700"
          />
        </div>
      </div>
      <div className=" text-start space-y-4 py-2 ">
        <h1 className="text-[#C4C4C4] font-medium text-base">Meals Rate</h1>
        <div className="border-2 rounded-lg max-w-xl sm:px-14  mx-auto py-4 ">
          {products?.map((product) => {
            return <ProductRate product={product} key={product.id} />;
          })}
        </div>
      </div>
      <div className=" text-start ">
        <h1 className="text-[#C4C4C4] font-medium text-base">
          Tell us about your Feedback
        </h1>
        <div className="py-4 px-4">
          <div className="mb-6">
            <input
              placeholder="Add note"
              type="text"
              id="large-input"
              className="flex w-full p-6 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className=" w-full  text-clip  shadow-inner  max-w-4xl items-center border-2 rounded-lg flex gap-10  px-6 mx-auto py-6 my-6">
        <button
          className="bg-black rounded-lg px-1 py-2 w-full text-white font-medium text-lg"
          onClick={handleSubmit} // Call handleSubmit when the button is clicked
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default RatingPage;
