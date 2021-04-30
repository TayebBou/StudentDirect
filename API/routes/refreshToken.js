const express = require("express");
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');
const validationMiddleware = require('../middleware/validation');
router.route("/")
   .post([validationMiddleware.validation('verifyToken')],refreshTokenController.refresh);
module.exports = router;