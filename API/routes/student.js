const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');
const validationMiddleware = require('../middleware/validation');
const verify = require('../middleware/verifyToken')

router.all('*', verify)
router.route("/")
   .get(studentController.read)
   .post([validationMiddleware.validation('student')], studentController.create);
router.route("/:id")
   .put([validationMiddleware.validation('student')],studentController.update)
   .delete(studentController.delete);
module.exports = router;