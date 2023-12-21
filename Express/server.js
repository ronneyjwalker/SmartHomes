const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const mySqlDb = require("./config/mySqlDbConnection");
const connectDB = require("./config/mongoDbConnection");
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use("/products", require("./routes/productRouter"));
app.use("/orders", require("./routes/orderRouter"));
app.use("/users", require("./routes/userRouter"));
app.use("/reviews", require("./routes/reviewRouter"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
