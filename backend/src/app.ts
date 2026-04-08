import express from "express";
import patientRoutes from "./modules/patients/patient.routes.js";

const app = express();

app.use(express.json());

app.use("/patients", patientRoutes);

export default app;