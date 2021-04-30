const accountModel = require('../models/account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        const body = req.body;

        // LETS VALIDATE THE DATA BEFORE WE A USER
        const user = await accountModel.findOne({login: body.login})
            if(!user){
                return res.status(404).send("Nom d'utilisateur invalide");
            }else{
                const validPass = await bcrypt.compare(body.password, user.password);
                if(!validPass){
                    return res.status(404).send("Mot de passe invalide");
                }else{
                    const token = jwt.sign({_id: user._id, role: user.role}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                    res.status(202).send({token});
                }
            }
        try{
            
            res.status(201).send();
        }catch(e){
            res.status(400).send(e);
        }
    }
 };