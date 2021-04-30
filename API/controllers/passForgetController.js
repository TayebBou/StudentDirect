const accountModel = require('../models/account');
const password = require('secure-random-password');
const nodemailer = require('nodemailer');

module.exports = {
    passReset: async (req, res) => {
        const body = req.body;
        try {
            // LETS VALIDATE THE DATA BEFORE WE A USER
            const user = await accountModel.findOne({ email: body.email }).then(async (result) => {
                if (result) {
                    const passwordNH = password.randomPassword({ length: 10 });
                    result.token = passwordNH;
                    console.log(result);
                    
                    try {
                        await result.save();
                        res.status(200).send();
                        // SEND MAIL 

                        const output = `
                            <p>Bonjour ${result.firstName + ' ' + result.lastName},</p><br><br>
                            <h3>Voici votre lien pour créer un nouveau mot de passe :</h3>
                            <ul>
                            <li>Lien réinitialisation mot de passe: <a href="http://localhost:4200/resetPassword/${result.token}">http://localhost:4200/resetPassword/${result.token}</a> </li>
                            </ul>
                            <br>
                            <p>Veuillez vous rendre sur le lien et changer votre mot de passe, merci.</p>
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
                            to: result.email, // list of receivers
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
                    return res.status(404).send("Email invalide");
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