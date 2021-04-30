const paymentModel = require('../models/payment');
var dateFormat = require('dateformat');
var moment = require('moment');

module.exports = {
    create: async (req, res) => {
        const body = req.body;

        const model = await new paymentModel({
            amountPaid: body.amountPaid,
            paymentDate: moment(body.paymentDate).format('YYYY-MM-DD HH:mm:ss.SSS[Z]'),
            modePayment: body.modePayment,
            studentId: body.studentId
        });
        try {
            await model.save();
            res.status(201).send();
        } catch (e) {
            res.status(400).send(e);
        }
    },
    read: async (req, res) => {

        const params = Object.keys(req.query);
        const allowedParams = ['studentId'];
        const isValidOperation = params.every((params) => allowedParams.includes(params));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid query!' });
        }
        try {
            const query = req.query;
            let search = {};
            const paymentsWD = [];
            if (query.studentId) {
                const payments = await paymentModel.find({ studentId: query.studentId });
                payments.forEach(async (payment) => {
                    let paymentDate = dateFormat(payment.paymentDate, "UTC:dd / mm / yyyy, hh:MM TT");
                    paymentsWD.push({
                        id: payment._id,
                        amountPaid: payment.amountPaid,
                        modePayment: payment.modePayment,
                        paymentDate: paymentDate,
                        studentId: payment.studentId
                    });
                });
                return await res.status(200).send(paymentsWD);
            }
            const payments = await paymentModel.find(search);

            payments.forEach(async (payment) => {
                let paymentDate = dateFormat(payment.paymentDate, "UTC:dd / mm / yyyy, h:MM TT");
                paymentsWD.push({
                    id: payment._id,
                    amountPaid: payment.amountPaid,
                    modePayment: payment.modePayment,
                    paymentDate: paymentDate,
                    studentId: payment.studentId
                });
            });
            res.send(paymentsWD);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    update: async (req, res) => {
        const body = req.body;
        const updates = Object.keys(body);
        const allowedUpdates = ['amountPaid', 'paymentDate', 'modePayment'];
        const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
        try {
            const model = await paymentModel.findByIdAndUpdate(req.params.id, {
                amountPaid: body.amountPaid,
                paymentDate: moment(body.paymentDate).format('YYYY-MM-DD HH:mm:ss.SSS[Z]'),
                modePayment: body.modePayment
            }, { new: true, runValidators: true })
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
            const model = await paymentModel.findByIdAndDelete(req.params.id)
            if (!model) {
                return res.status(404).send();
            }
            res.send(model)
        } catch (e) {
            res.status(500).send(e);
        }
    }
};