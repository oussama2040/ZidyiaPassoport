import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from 'body-parser';




// import userroute from "./routes/userRoute.js";
// import authorroute from "./routes/authRoute.js";
import superadminRoute from './routes/superadminRoute.js'
import userroute from "./routes/userRoute.js";
import student from "./routes/student.js";
import subscriber from "./routes/subscriber.js";
import tenent from "./routes/tenent.js";
import generateqr from "./routes/qrcode.js";
import scanqr from "./routes/scanqr.js";
import anonymous from "./routes/anonymousRoute.js"
import certificateRoute from "./routes/certificateRoute.js";
import studentRoutes from "./routes/studentRoute.js";
import customizeRoute from './routes/customizeRoute.js';

// import authorroute from "./routes/authRoute.js";

// import accesstoken from "./controllers/accessTokenController.js";
import cookieParser from "cookie-parser";

const app = express();
// Set maximum request size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
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
app.use(superadminRoute);
// app.use("/author", authorroute);

app.use(userroute);


// app.use("/author", authorroute);
app.use("/student", student);
app.use("/subscriber", subscriber)
app.use("/tenent", tenent)
app.use("/admin", generateqr)
app.use("/subscriber", scanqr);

// app.use(accesstoken);
app.use('/students', studentRoutes);
app.use('/admin', certificateRoute);
app.use(customizeRoute);
app.use('/', anonymous);




app.listen(process.env.PORT, () => {
  console.log(`Listening to requests on port ${process.env.PORT}`);

});



