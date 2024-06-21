const express = require("express");
const {
  createExercise,
  getLogs,
} = require("../controllers/exerciseController");
const router = express.Router();

router.post("/users/:_id/exercises", createExercise);
router.get("/users/:_id/logs", getLogs);

module.exports = router;
