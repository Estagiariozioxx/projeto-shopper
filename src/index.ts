import express from "express";
import cors from 'cors';
import path from 'path';
import waterGasRoute from "./routes/WaterGasRoute";


const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const secretKey = process.env.SECRET_KEY || 'imgtempshopper';


const app = express();

app.use(cors())

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use('/', waterGasRoute);

app.use('/files', express.static(path.join(__dirname, './temp_images')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});