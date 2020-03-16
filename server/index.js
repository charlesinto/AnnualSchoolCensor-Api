import express from "express";
import  "dotenv/config";

const app = express();




app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port: ${process.env.PORT || 3000}`)
})