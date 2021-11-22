const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.urlencoded({
    extended: true
}));
const router = require('./routes/router');
app.use(express.json());

const port = 5000;

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('Successfully connected to the database.'))
    .catch((err) => console.log(err));

app.use('/api', router);

app.listen(port, () => console.log(`Forlogis backend listening on port ${port}!`));