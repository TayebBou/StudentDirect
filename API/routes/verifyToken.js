const express = require("express");
const router = express.Router();
const verifyTokenController = require('../controllers/verifyTokenController');
const validationMiddleware = require('../middleware/validation');
router.route("/")
   .post([validationMiddleware.validation('verifyToken')],verifyTokenController.verify);
module.exports = router;