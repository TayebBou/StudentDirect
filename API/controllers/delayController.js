const delayModel = require('../models/delay');
const dateFormat = require('dateformat');
var moment = require('moment');


module.exports = {
    create: async (req, res) => {
        const body = req.body;
        const model = await new delayModel({
            session: body.session,
            matter: body.matter,
            date: moment(body.date).format('YYYY-MM-DD HH:mm:ss.SSS[Z]'),
            durationInMin: body.durationInMin,
            reasonDelay: body.reasonDelay,
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
            const delaysWD = [];
            if (query.studentId) {
                const delays = await delayModel.find({ studentId: query.studentId });
                delays.forEach(async (delay) => {
                    let delayDate = dateFormat(delay.date, "UTC:dd / mm / yyyy, h:MM TT");
                    delaysWD.push({
                        id: delay._id,
                        session: delay.session,
                        matter: delay.matter,
                        durationInMin: delay.durationInMin,
                        date: delayDate,
                        reasonDelay: delay.reasonDelay,
                        studentId: delay.studentId
                    });
                });
                return await res.status(200).send(delaysWD);
            }
            const delays = await delayModel.find(search);

            delays.forEach(async (delay) => {
                let delayDate = dateFormat(delay.date, "UTC:dd / mm / yyyy, h:MM TT");
                delaysWD.push({
                    id: delay._id,
                    session: delay.session,
                    matter: delay.matter,
                    durationInMin: delay.durationInMin,
                    date: delayDate,
                    reasonDelay: delay.reasonDelay,
                    studentId: delay.studentId
                });
            });
            res.send(delaysWD);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    update: async (req, res) => {
        const body = req.body;
        const updates = Object.keys(body);
        const allowedUpdates = ['matter', 'durationInMin', 'date', 'session', 'reasonDelay'];
        const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
        try {
            const model = await delayModel.findByIdAndUpdate(req.params.id, {
                session: body.session,
                matter: body.matter,
                date: moment(body.date).format('YYYY-MM-DD HH:mm:ss.SSS[Z]'),
                durationInMin: body.durationInMin,
                reasonDelay: body.reasonDelay
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
            const model = await delayModel.findByIdAndDelete(req.params.id)
            if (!model) {
                return res.status(404).send();
            }
            res.send(model)
        } catch (e) {
            res.status(500).send(e);
        }
    }
};