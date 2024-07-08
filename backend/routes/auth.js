const express = require("express");

const userController = require("../controllers/authController");

const router = express.Router();
router.post("/createuser", userController.createUser);
router.get("/getusers", userController.getUsers);
router.delete("/deleteuser/:id", userController.deleteUser);

module.exports = router;
