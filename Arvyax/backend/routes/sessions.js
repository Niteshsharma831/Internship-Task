const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/sessionController");

router.get("/sessions", ctrl.getPublicSessions); // public

router.get("/my-sessions", auth, ctrl.getMySessions);
router.get("/my-sessions/:id", auth, ctrl.getMySessionById);
router.post("/my-sessions/save-draft", auth, ctrl.saveDraft);
router.post("/my-sessions/publish", auth, ctrl.publish);

module.exports = router;
