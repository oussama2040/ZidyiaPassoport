import express from "express";
import morgan from "morgan";
import cors from "cors";
import connection from "./config/connection.js";

// import userroute from "./routes/userRoute.js";
// import authorroute from "./routes/authRoute.js";
import superadminRoute from './routes/superadminRoute.js'

import userroute from "./routes/userRoute.js";
import student from "./routes/student.js";

// import accesstoken from "./controllers/accessTokenController.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: [], // Add other HTTP methods if needed
    allowedHeaders: ["Content-Type", "Authorization"], // Add other allowed headers if needed
    credentials: true, // Allow cookies to be sent with the request
  })
);

// parser
app.use(express.json());

// Use cookie parser middleware
app.use(cookieParser());

// morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.Node_ENV}`);
}

// routes

// app.use(userroute);
app.use(superadminRoute)
// app.use("/author", authorroute);

app.use(userroute);
app.use("/student", student);

// app.use(accesstoken);

// connecting to databse ==> listening to requests

if(connection){
  app.listen(process.env.PORT, () => {
    console.log(`Listening to requests on port ${process.env.PORT}`);
    
});  
}


 
