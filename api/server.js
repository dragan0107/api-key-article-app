const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/router');
dotenv.config();
app.use(express.json());
const port = 5000;

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('Successfully connected to the database.'))
    .catch((err) => console.log(err));



app.use('/api', router);
app.get('/', (req, res) => {

    console.log(req.cookies)
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));