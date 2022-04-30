const userController = {};

// 1. User can create account with email and password and name
userController.register = (req, res, next) => {};

// 2. User can login with email and password
userController.login = (req, res, next) => {};

// 3. Owner can get own user's profile
userController.getCurrentUserProfile = (req, res, next) => {};

// 4. user can get single user profile by id (login required)
userController.getSingleUserById = (req, res, next) => {};

// 5. Owner can update own account profile (password?)
userController.updateAccount = (req, res, next) => {};

// 6. Owner can deactivate own account
userController.deactivateAccount = (req, res, next) => {};

module.exports = userController;
