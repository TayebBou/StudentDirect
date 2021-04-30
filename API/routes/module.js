const express = require("express");
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const validationMiddleware = require('../middleware/validation');
const verify = require('../middleware/verifyToken')

router.all('*', verify)
router.route("/")
   .get(moduleController.read)
   .post([validationMiddleware.validation('module')],moduleController.create);
router.route("/:id")
   .put([validationMiddleware.validation('module')],moduleController.update)
   .delete(moduleController.delete);
module.exports = router;