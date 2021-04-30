const express = require("express");
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');
const validationMiddleware = require('../middleware/validation');

router.route("/")
   .post([validationMiddleware.validation('resetPassword')],resetPasswordController.resetPassword);
module.exports = router;