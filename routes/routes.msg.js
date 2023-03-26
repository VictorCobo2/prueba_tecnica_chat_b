const { postMsg, getMsgs } = require("../controllers/controller.msg");
const router = require("express").Router();

router.post("/post-msg/", postMsg);
router.post("/get-msg/", getMsgs);

module.exports = router;
