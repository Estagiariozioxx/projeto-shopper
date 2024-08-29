import express from "express";
import cors from 'cors';
import path from 'path';
import waterGasRoute from "./routes/WaterGasRoute";

const app = express();

app.use(cors())

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use('/', waterGasRoute);

app.use('/files', express.static(path.join(__dirname, './temp_images')));

export default app;
