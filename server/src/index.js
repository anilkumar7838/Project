import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectMongoDb } from "./db/mongodb.js";
import { router as authRoute } from "./routes/auth/index.js";
const clientUrl =
  process.env.NODE_ENV === "development"
    ? process.env.PROD_CLIENT_URL
    : process.env.DEV_CLIENT_URL;
const app = express();

app.use(
  cors({
    origin: [clientUrl],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

//routes
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error occured while starting the server", err);
  } else {
    console.log("Running at port:", process.env.PORT);
    connectMongoDb();
  }
});
