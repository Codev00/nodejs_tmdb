import express from "express";
import userRoute from "../routes/user.route.js";
import mediaRoute from "../routes/media.route.js";
import reviewRoute from "../routes/review.route.js";
import personRoute from "../routes/person.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/:mediaType", mediaRoute);
router.use("/review", reviewRoute);
router.use("/person", personRoute);

export default router;
