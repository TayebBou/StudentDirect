const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.header('auth-token');
    console.log(token);
    console.log("entre");

    if (!token) {
        return res.status(401).send('Token introuvable')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        console.log('pass');
        next();
    } catch (err) {
        if ("TokenExpiredError" == err.name) {
            return res.status(401).send('Expired Token')
        }
        res.status(400).send('Invalid Token')
    }
}