import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import leadsRoutes from "./routes/leads.route";
import tasksRoutes from "./routes/tasks.route";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/unite";
mongoose.connect(MONGO).then(()=>console.log("Connected to Mongo")).catch(e=>console.error(e));

app.use("/auth", authRoutes);
app.use("/leads", leadsRoutes);
app.use("/tasks", tasksRoutes);

const swaggerDoc = YAML.load(path.join(__dirname, "../openapi.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/health", (req,res)=>res.json({ok:true}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log("Server listening", PORT));
