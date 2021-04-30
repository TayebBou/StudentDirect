const express = require("express");
const router = express.Router();
const delayController = require('../controllers/delayController');
const validationMiddleware = require('../middleware/validation');
const verify = require('../middleware/verifyToken')

router.all('*', verify)
router.route("/")
   .get(delayController.read)
   .post([validationMiddleware.validation('delay')],delayController.create);
router.route("/:id")
   .put([validationMiddleware.validation('delay')],delayController.update)
   .delete(delayController.delete);
module.exports = router;