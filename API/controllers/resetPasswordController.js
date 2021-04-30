const accountModel = require('../models/account');
const bcrypt = require('bcryptjs');

module.exports = {
    resetPassword: async (req, res) => {
        const body = req.body;
        try {
            // LETS VALIDATE THE DATA BEFORE WE A USER
            await accountModel.findOne({ token: body.token }).then(async (result) => {
                if (result) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(body.password, salt);
                    result.password = hashedPassword;
                    try {
                        await result.save();
                        res.status(200).send();
                    } catch (e) {
                        res.status(400).send(e);
                    }
                } else {
                    return res.status(404).send("lien invalide");
                }
            }).catch((e) => {
                res.status(400).send(e.message);
                console.log(e);
            })

        } catch (e) {
            res.status(400).send(e);
        }
    }
};