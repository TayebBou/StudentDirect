const express = require("express");
const router = express.Router();
const passForgetController = require('../controllers/passForgetController');
const validationMiddleware = require('../middleware/validation');

router.route("/")
   .post([validationMiddleware.validation('passForget')],passForgetController.passReset);
module.exports = router;