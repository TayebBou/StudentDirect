const studentModel = require('../models/student');
const password = require('secure-random-password');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const accountModel = require('../models/account')

module.exports = {
    create: async (req, res) => {
        const body = req.body;
        const accountId = mongoose.Types.ObjectId();
        const student = await new studentModel(
            { cin: body.cin,  sexe: body.sexe, specialty: body.specialty, level: body.level, numberPhone: body.numberPhone, accountId: accountId }
        );
        // Hash passwords
        const passwordNH = password.randomPassword({ length: 10 });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordNH, salt);
        
        const account = await new accountModel({
            _id: accountId,
            lastName: body.lastName, firstName: body.firstName,
            email: body.email, login: student.firstName + student.lastName + password.randomPassword({ length: 4, characters: password.digits }), password: hashedPassword, role: "etudiant"
        });
        try {
            await accountModel.exists({ email: body.email }).then(async (result) => {
                if (result == false) {
                    try {
                        await student.save();
                        await account.save();
                        res.status(201).send();
                        // SEND MAIL 

                        const output = `
                            <p>Bonjour ${account.firstName + ' ' + account.lastName},<br><br>
                            Vous avez été enregistré sur Student-direct avec succès.</p><br>
                            <h3>Voici vos identifiants :</h3>
                            <ul>
                            <li>Nom d'utilisateur: ${account.login}</li>
                            <li>Mot de passe: ${passwordNH}</li>
                            </ul>
                            <br>
                            <p>Veuillez vous connecter et changer votre mot de passe, merci.</p>
                        `;

                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: 'HERE YOUR GMAIL ADDRESS', // generated ethereal user
                                pass: 'HERE YOUR GMAIL PASSWORD'  // generated ethereal password
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });

                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"Student-direct" <HERE YOUR GMAIL ADDRESS>', // sender address
                            to: account.email, // list of receivers
                            subject: 'Bienvenue sur Student-direct', // Subject line
                            text: 'Hello world?', // plain text body
                            html: output // html body
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            console.log('Email has been sent');
                        });
                    } catch (e) {
                        res.status(400).send(e);
                    }
                } else {
                    throw Error('Email existant');
                }
            }).catch((e) => {
                res.status(400).send(e.message);
                console.log(e);
            })
        } catch (e) {
            res.status(400).send(e);
        }
    },
    read: async (req, res) => {
        const params = Object.keys(req.query);
        const allowedParams = ['firstName', 'lastName'];
        const isValidOperation = params.every((params) => allowedParams.includes(params));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid query!' });
        }
        try {
            const query = req.query;
            let search = {};
            const students =  await studentModel.find(search);
            
            if (query.firstName || query.lastName) {
                Object.keys(query).forEach(key => {
                    search[key] = { "$regex": query[key], "$options": "i" }
                });
                return await res.status(200).send(students);
            }
                const accounts = [];
                var j = 0;
                const numStudents = await studentModel.countDocuments();
                students.forEach(async (student) => {
                    await accountModel.findById(student.accountId, (error, res) => {
                        accounts.push({
                            id: student._id,
                            email: res.email,
                            cin: student.cin,
                            lastName: res.lastName,
                            firstName: res.firstName,
                            sexe: student.sexe,
                            specialty: student.specialty,
                            level: student.level,
                            numberPhone: student.numberPhone
                        });
                        if (error)
                            return res.status(400).send(error);
                    });
                    if (j == (numStudents - 1))
                        return await res.status(200).send(accounts);
                    j++;
                });
        } catch (e) {
            return res.status(500).send(e);
        }
    },
    update: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['cin', 'firstName', 'lastName', 'email', 'level', 'numberPhone', 'sexe', 'specialty'];
        const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
        try {
            const student = await studentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            if (!student) {
                return res.status(404).send();
            }
            await studentModel.findById(req.params.id, async (error, res) => {
                
                await accountModel.findByIdAndUpdate(res.accountId, req.body, { new: true, runValidators: true })
            });
            res.status(200).send();
        } catch (e) {
            res.status(400).send(e);
        }
    },
    delete: async (req, res) => {
        try {
            const student = await studentModel.findById(req.params.id, async (error, res) => {

                await accountModel.findByIdAndDelete(res.accountId);
            });
            if (!student)
                return res.status(404).send();
            else
                res.status(200).send();
            await studentModel.findByIdAndDelete(req.params.id);
        } catch (e) {
            res.status(500).send(e);
        }
    }
};

