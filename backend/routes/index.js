const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const entranceRouter = require("./entrance");
const complainRouter = require("./complain");
const gangRouter = require("./gang");
 



 
router.use("/gang", gangRouter);
router.use("/entrance", entranceRouter);
router.use("/complain", complainRouter);
router.use("/users", usersRouter);
 

module.exports = router;
