import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());
connectDB();
connectCloudinary()

//api end points
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/", (req, res) => {
  res.send("api working");
});



app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
