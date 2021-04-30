const express = require("express");
const router = express.Router();
const accountController = require('../controllers/accountController');
const validationMiddleware = require('../middleware/validation');
const verify = require('../middleware/verifyToken')

//router.all('*', verify)
router.route("/")
   .get(accountController.read)
   .post([validationMiddleware.validation('account')],accountController.create);
router.route("/:id")
   .put([validationMiddleware.validation('accountEdit')],accountController.update)
   .delete(accountController.delete);
module.exports = router;