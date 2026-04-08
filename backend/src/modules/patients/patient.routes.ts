import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get all patients");
});

export default router;