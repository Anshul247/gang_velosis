const express = require("express");
 
const router = express.Router();
 

router.get("/", loginView);
router.get("/register", registerView);

// router.get("/login", loginView);
//Dashboard
// router.get("/dashboard", View);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;