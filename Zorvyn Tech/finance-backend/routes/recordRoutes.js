const express = require("express");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

const router = express.Router();

router.post("/", protect, allowRoles("admin"), createRecord);
router.get("/", protect, allowRoles("admin", "analyst"), getRecords);
router.put("/:id", protect, allowRoles("admin"), updateRecord);
router.delete("/:id", protect, allowRoles("admin"), deleteRecord);

module.exports = router;