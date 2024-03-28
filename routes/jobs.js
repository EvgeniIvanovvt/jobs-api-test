const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getAllUserJobs,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/id").get(getJob).post(updateJob).delete(deleteJob);
router.route("/currentJobs").get(getAllUserJobs);

module.exports = router;
