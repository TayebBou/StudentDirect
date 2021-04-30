const jwt = require('jsonwebtoken');

module.exports = {

    refresh: async (req, res) => {
        console.log("REFRESH TOKEN");
        
        const body = req.body;
        try {
            if (body.token) {
                try {
                    jwt.verify(body.token, process.env.TOKEN_SECRET, (err, decoded) => {
                        if (err) {
                            if ("TokenExpiredError" == err.name) {
                                const payload = jwt.decode(body.token);
                                    console.log(payload);
                                    delete payload.iat;
                                    delete payload.exp;
                                    delete payload.nbf;
                                    delete payload.jti;
                                    newToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                                    console.log(newToken);
                                    return res.status(202).send({newToken});
                            }else{
                                return res.status(400).send('Invalid Token')
                            }
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            } else
                return res.status(401).send();
        } catch (e) {
            res.status(500).send(e);
        }
    }
};