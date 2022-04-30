const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.router;
const {
  register,
  login,
  getCurrentUserProfile,
  getSingleUserById,
  updateAccount,
  deactivateAccount,
} = userController;

router.post("/register", register);

router.post("/login", login);

router.get("/me", getCurrentUserProfile);

router.get("/:id", getSingleUserById);

router.put("/me/update", updateAccount);

router.delete("/me/deactivate", deactivateAccount);

module.exports = router;
