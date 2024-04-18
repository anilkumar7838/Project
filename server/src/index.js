import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import {connectMongoDb} from "./db/mongodb.js"

const app = express()
app.use(cors())
app.use(express.json());
dotenv.config();

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error occured while starting the server", err);
  } else {
    console.log("Running at port:", process.env.PORT);
    connectMongoDb();
  }
});
