const absenceModel = require('../models/absence');
const dateFormat = require('dateformat');
var moment = require('moment');

module.exports = {
    create: async (req, res) => {
        const body = req.body;
        const model = await new absenceModel({
            session: body.session,
            matter: body.matter,
            date: moment(body.date).format('YYYY-MM-DD HH:mm:ss.SSS[Z]'),
            justification: body.justification,
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
            const absencesWD = [];
            if (query.studentId) {
                const absences = await absenceModel.find({ studentId: query.studentId });
                absences.forEach(async (absence) => {
                    let absenceDate = dateFormat(absence.date, "UTC:dd / mm / yyyy, h:MM TT");
                    absencesWD.push({
                        id: absence._id,
                        session: absence.session,
                        matter: absence.matter,
                        date: absenceDate,
                        justification: absence.justification,
                        studentId: absence.studentId
                    });
                });
                return await res.status(200).send(absencesWD);
            }
            const absences = await absenceModel.find(search);

            absences.forEach(async (absence) => {
                let absenceDate = dateFormat(absence.date, "UTC:dd / mm / yyyy, h:MM TT");
                absencesWD.push({
                    id: absence._id,
                    session: absence.session,
                    matter: absence.matter,
                    date: absenceDate,
                    justification: absence.justification,
                    studentId: absence.studentId
                });
            });
            res.send(absencesWD);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    update: async (req, res) => {
        const body = req.body;
        const updates = Object.keys(body);
        const allowedUpdates = ['session', 'date', 'matter', 'justification', 'studentId'];
        const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
        try {
            const model = await absenceModel.findByIdAndUpdate(req.params.id, {
                session: body.session,
                matter: body.matter,
                date: moment(body.date).format('YYYY-MM-DD HH:mm:ss.SSS[Z]'),
                justification: body.justification
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
            const model = await absenceModel.findByIdAndDelete(req.params.id)
            if (!model) {
                return res.status(404).send();
            }
            res.send(model)
        } catch (e) {
            res.status(500).send(e);
        }
    }
};