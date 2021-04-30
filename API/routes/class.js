const express = require("express");
const router = express.Router();
const classController = require('../controllers/classController');
const validationMiddleware = require('../middleware/validation');
const verify = require('../middleware/verifyToken')

router.all('*', verify)
router.route("/")
   .get(classController.read)
   .post([validationMiddleware.validation('class')],classController.create);
router.route("/:id")
   .put([validationMiddleware.validation('class')],classController.update)
   .delete(classController.delete);
module.exports = router;