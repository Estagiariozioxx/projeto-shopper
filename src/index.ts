import express from "express";
import cors from 'cors';
//import { authentication } from "middlewares/auth";
//import { DateTime } from "luxon";
import WaterGasRoute from "./routes/WaterGasRoute";

const app = express();

app.use(cors())

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/upload", WaterGasRoute);

app.listen(process.env.PORT || 3000);