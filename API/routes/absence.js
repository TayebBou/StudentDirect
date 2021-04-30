const express = require("express");
const router = express.Router();
const absenceController = require('../controllers/absenceController');
const validationMiddleware = require('../middleware/validation');
const verify = require('../middleware/verifyToken')

router.all('*', verify)
router.route("/")
   .get(absenceController.read)
   .post([validationMiddleware.validation('absence')],absenceController.create);
router.route("/:id")
   .put([validationMiddleware.validation('absence')],absenceController.update)
   .delete(absenceController.delete);
module.exports = router;