import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from "./routes/authRoute";
import  "dotenv/config";

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/api/v1/auth', authRoute)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port: ${process.env.PORT || 3000}`)
})