import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicaionRoute from "./routes/application.route.js"


dotenv.config({});

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOperations = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOperations));
// Alternatively, use this middleware for more control:
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const PORT = process.env.PORT || 3000;

//apis
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicaionRoute)

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is Running at port ${PORT}`);
    
})


// mongodb+srv://asad:4gXfGkMyiwKydFF6@cluster0.oqikr.mongodb.net/