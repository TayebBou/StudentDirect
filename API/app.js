const express = require('express');
require('./db/mongoose');
require('dotenv').config();
const apiRouter =  require('./routes/routes');

var cors = require('cors');
const app = express()  

app.use(cors())

const port = process.env.PORT || 3000

app.use(express.json())
//app.use(etudiantRouter);

app.use('/api', apiRouter);



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})