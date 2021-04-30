const examModel = require('../models/exam');

module.exports = {
    create: async (req, res) => {
        const model = new examModel(req.body);
        try{
            await model.save();
            res.status(201).send();
        }catch(e){
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
                const exams = await examModel.find({ studentId: query.studentId });
                return await res.status(200).send(exams);
            }
            const exams = await examModel.find(search);
            res.status(200).send(exams);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    update: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = [ 'name', 'mark' ];
        const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates));

        if(!isValidOperation){
            return res.status(400).send({ error: 'Invalid updates!'});
        }
        try{
            const model = await examModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            if(!model){
                return res.status(404).send();
            }
            res.send(model)
        }catch(e){
            res.status(400).send(e);
        }
    },
    delete: async (req, res) => {
        try{
            const model = await examModel.findByIdAndDelete(req.params.id)
            if(!model){
                return res.status(404).send();
            }
            res.send(model)
        }catch(e){
            res.status(500).send(e);
        }
    }
 };