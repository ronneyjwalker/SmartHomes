import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewReviewForm = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the API
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews");
        if (response.status === 200) {
          setReviews(response.data);
        } else {
          console.error("Error fetching reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    fetchReviews();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div className="container">
      <h2>View Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>User Name</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Product Maker</th>
            <th>Review Rating</th>
            <th>Review Date</th>
            <th>Review Text</th>
            <th>Retailer Pin</th>
            <th>Retailer City</th>
            <th>User Age</th>
            <th>User Gender</th>
            <th>User Occupation</th>
            <th>Price</th>
            {/* Add additional columns as needed */}
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.title}</td>
              <td>{review.userName}</td>
              <td>{review.productName}</td>
              <td>{review.productType}</td>
              <td>{review.productMaker}</td>
              <td>{review.reviewRating}</td>
              <td>{review.reviewDate}</td>
              <td>{review.reviewText}</td>
              <td>{review.retailerpin}</td>
              <td>{review.retailercity}</td>
              <td>{review.userAge}</td>
              <td>{review.userGender}</td>
              <td>{review.userOccupation}</td>
              <td>{review.price}</td>
              {/* Add additional cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewReviewForm;
