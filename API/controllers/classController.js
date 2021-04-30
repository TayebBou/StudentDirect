const classModel = require('../models/class');

module.exports = {
    create: async (req, res) => {
        const model = new classModel(req.body);
        try{
            await model.save();
            res.status(201).send();
        }catch(e){
            res.status(400).send(e);
        }
    },
    read: async (req, res) => {
        try{
            const classes = await classModel.find({});
            res.send(classes);
        }catch(e){
            res.status(500).send(e);
        }
    },
    update: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = [ 'nameClass' ];
        const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates));

        if(!isValidOperation){
            return res.status(400).send({ error: 'Invalid updates!'});
        }
        try{
            const model = await classModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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
            const model = await classModel.findByIdAndDelete(req.params.id)
            if(!model){
                return res.status(404).send();
            }
            res.send(model)
        }catch(e){
            res.status(500).send(e);
        }
    }
 };