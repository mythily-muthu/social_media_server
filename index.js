
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, "mythu" + "_" + file.originalname);
    },
});
const upload = multer({ storage });

//routes with files 
app.post("/auth/register", upload.single("picture"), register);

//routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// mongoose setup
let PORT = process.env.PORT || 6001;

mongoose.set('strictQuery', true); // avoid deprecate warning
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
}).then(
    () => {
        app.listen(PORT, console.log("server running successfully"))
    }
).catch((error) => { console.log(`${error} did not connect`); })