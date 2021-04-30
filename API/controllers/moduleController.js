const moduleModel = require('../models/module');
const studentModel = require('../models/student');

module.exports = {
    create: async (req, res) => {
        const model = new moduleModel(req.body);
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
            if (query.studentId) {
                const student = await studentModel.findOne({ _id: query.studentId });
                const models = await moduleModel.aggregate([
                    { $match: { level: student.level } },
                    { "$unwind": "$matters" },
                    {
                        "$lookup": {
                            "from": "exams",
                            "as": "matters.exams",
                            let: { matterId: "$matters._id", studentId: student._id },
                            "pipeline": [{
                                "$match":
                                {
                                    $expr:
                                    {
                                        $and: [
                                            { $eq: ["$studentId", "$$studentId"] },
                                            { $eq: ["$matterId", "$$matterId"] }
                                        ]
                                    }
                                    //  { studentId: { $ifNull: { $and: [ {  $eq: [ "$studentId", "$$studentId" ] }, { $eq: [ "$matterId", "$$matterId"] } ] }
                                    //   ,  $eq: [ "$matterId", "$$matterId"]   }  },
                                    //{ $and: [ {  $eq: [ "$studentId", "$$studentId" ] }, { $eq: [ "$matterId", "$$matterId"] } ] }
                                }
                            }],
                        }
                    },
                    {
                        //$cond: { if: { $eq: [ "$matters.exams.studentId", query.studentId ] }, then: $$KEEP, else: $$PRUNE },
                        "$group": {
                            "_id": "$_id",
                            "name": { $first: "$name" },
                            "level": { $first: "$level" },
                            "average": { $first: "$average" },
                            "matters": { "$push": "$matters" },
                        }
                    },
                ], async (err, result) => {
                });
                return await res.status(200).send(models);
            }
            const modules = await moduleModel.find(search);
            res.send(modules);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    update: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'matters', 'level'];
        const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
        try {
            const model = await moduleModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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
            const model = await moduleModel.findByIdAndDelete(req.params.id)
            if (!model) {
                return res.status(404).send();
            }
            res.send(model)
        } catch (e) {
            res.status(500).send(e);
        }
    }
};