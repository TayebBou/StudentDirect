const express = require("express");
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const validationMiddleware = require('../middleware/validation');
const verify = require('../middleware/verifyToken')

router.all('*', verify)
router.route("/")
   .get(paymentController.read)
   .post([validationMiddleware.validation('payment')],paymentController.create);
router.route("/:id")
   .put([validationMiddleware.validation('payment')],paymentController.update)
   .delete(paymentController.delete);
module.exports = router;