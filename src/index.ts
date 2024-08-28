import express from "express";
import cors from 'cors';
//import { authentication } from "middlewares/auth";
//import { DateTime } from "luxon";
import waterGasRoute from "./routes/WaterGasRoute";

const app = express();

app.use(cors())

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello World");
});

//app.use("/upload", WaterGasRoute);
app.use('/', (req, res, next) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
}, waterGasRoute);

//app.listen(process.env.PORT || 3000);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});