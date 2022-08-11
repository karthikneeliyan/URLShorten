import express from "express";
import { connectDB } from "./connection";
import { router } from "./route";

import cors from 'cors';
import path from "path";



const app = express();
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/api', router);
// Server Setup
const PORT = 3333;
(async function(){
const db=await connectDB()
console.log(db)
})()
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});