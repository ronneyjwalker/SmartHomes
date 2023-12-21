import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const WriteReviewForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    userName: "",
    productName: "",
    productType: "",
    productMaker: "",
    reviewRating: "",
    reviewDate: "",
    reviewText: "",
    retailerpin: "",
    retailercity: "",
    userAge: "",
    userGender: "",
    userOccupation: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevDetails) => ({
      ...prevDetails,
      reviewDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/reviews",
        formData
      );

      if (response.status === 201) {
        // Handle successful submission, e.g., redirect or show a success message
        console.log(response.data);
        console.log("Review submitted successfully!");
        alert("Submitted Succesfully");
        navigate("/products");
      } else {
        // Handle error response
        console.error("Error submitting review");
      }
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <div className="container">
      <h2>Write Review</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Title:</td>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>User Name:</td>
              <td>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Product Type:</td>
              <td>
                <input
                  type="text"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Product Maker:</td>
              <td>
                <input
                  type="text"
                  name="productMaker"
                  value={formData.productMaker}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Review Rating:</td>
              <td>
                <input
                  type="text"
                  name="reviewRating"
                  value={formData.reviewRating}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Review Date:</td>
              <td>
                <DatePicker
                  selected={formData.reviewDate}
                  onChange={(date) => handleDateChange(date)}
                  dateFormat="EEE MMM dd yyyy HH:mm:ss 'GMT'xxx (zzz)"
                />
              </td>
            </tr>
            <tr>
              <td>Review Text:</td>
              <td>
                <textarea
                  name="reviewText"
                  value={formData.reviewText}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Retailer Pin:</td>
              <td>
                <input
                  type="text"
                  name="retailerpin"
                  value={formData.retailerpin}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Retailer City:</td>
              <td>
                <input
                  type="text"
                  name="retailercity"
                  value={formData.retailercity}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>User Age:</td>
              <td>
                <input
                  type="text"
                  name="userAge"
                  value={formData.userAge}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>User Gender:</td>
              <td>
                <input
                  type="text"
                  name="userGender"
                  value={formData.userGender}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>User Occupation:</td>
              <td>
                <input
                  type="text"
                  name="userOccupation"
                  value={formData.userOccupation}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};
export default WriteReviewForm;
