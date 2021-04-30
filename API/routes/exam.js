const express = require("express");
const router = express.Router();
const examController = require('../controllers/examController');
const validationMiddleware = require('../middleware/validation');
const verify = require('../middleware/verifyToken')

router.all('*', verify)
router.route("/")
   .get(examController.read)
   .post([validationMiddleware.validation('exam')],examController.create);
router.route("/:id")
   .put([validationMiddleware.validation('exam')],examController.update)
   .delete(examController.delete);
module.exports = router;