const jwt = require('jsonwebtoken');

module.exports = {

    verify: async (req, res) => {
        const body = req.body;
        try {
            if (body.token) {
                try {
                    var decoded = jwt.verify(body.token, process.env.TOKEN_SECRET);
                } catch (e) {
                    console.log(e);
                }
                console.log(decoded);
                
                if (decoded){
                    return res.status(202).send();
                } else {
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
                }
            } else
                return res.status(401).send();
        } catch (e) {
            res.status(500).send(e);
        }
    }
};

