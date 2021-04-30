const accountModel = require('../models/account');
const bcrypt = require('bcryptjs');

module.exports = {
    create: async (req, res) => {
        const body = req.body;

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const model = new accountModel({
            firstName: body.firstName,
            lastName: body.lastName,
            login: body.login,
            email: body.email,
            password: hashedPassword,
            role: 'administrateur'
        });

        try {
            await model.save();
            res.status(201).send();
        } catch (e) {
            res.status(400).send(e);
        }
    },
    read: async (req, res) => {
        console.log("entre ici");
        
        const accountsWP = [];
        var j = 0;
        const numAccounts = await accountModel.find({ role: 'administrateur' }).countDocuments();
        if(numAccounts === 0) {
            return res.send([]);
        }
        try {
            const accounts = await accountModel.find({ role: 'administrateur' });
            accounts.forEach(async (account) => {
                await accountModel.findById(account._id, (error, res) => {
                    accountsWP.push({
                        id: res._id,
                        login: res.login,
                        firstName: res.firstName,
                        lastName: res.lastName,
                        email: res.email
                    });
                    if (error)
                        return res.status(400).send(error);
                });
                if (j == (numAccounts - 1))
                    return await res.status(200).send(accountsWP);
                j++;
            });
        } catch (e) {
            res.status(500).send(e);
        }
    },
    update: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['firstName', 'lastName', 'email', 'login', 'password'];
        const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
        try {
            const body = req.body;
            console.log(body.password);
            if (body.password) {

                // Hash passwords
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(body.password, salt);
                modelBody = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    login: body.login,
                    password: hashedPassword
                }
            } else {
                modelBody = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    login: body.login
                }
            }
            const model = await accountModel.findByIdAndUpdate(req.params.id, modelBody, { new: true, runValidators: true })
            if (!model) {
                return res.status(404).send();
            }
            res.send(model)
        } catch (e) {
            res.status(400).send(e);
        }
    },
    delete: async (req, res) => {
        try {
            const model = await accountModel.findByIdAndDelete(req.params.id)
            if (!model) {
                return res.status(404).send();
            }
            res.send(model)
        } catch (e) {
            res.status(500).send(e);
        }
    }
};