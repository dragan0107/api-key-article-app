const mongoose = require('mongoose');
const generateApiKey = require('generate-api-key');


const apiKeySchema = new mongoose.Schema({
    api_key: {
        type: String
    },
    createdBy: {
        type: String
    }
});


const APIKey = mongoose.model('apikey', apiKeySchema);


module.exports = APIKey;