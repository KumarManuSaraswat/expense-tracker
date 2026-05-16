const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.route("/").post(protect, createExpense).get(protect, getExpenses);
router.route("/:id").put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;