const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const { register, login, getSingleUserById, updateAccount, deactivateAccount } =
  userController;
const { loginRequired } = require("../middlewares/authentication");

router.post("/register", register);

router.post("/login", login);

router.get("/:id", getSingleUserById);

router.put("/me/update", loginRequired, updateAccount);

router.delete("/me/deactivate", loginRequired, deactivateAccount);

module.exports = router;
