const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController');
const validationMiddleware = require('../middleware/validation');

router.route("/")
   .post([validationMiddleware.validation('login')],loginController.login);
module.exports = router;