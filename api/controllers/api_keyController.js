const generateApiKey = require('generate-api-key');
const APIKey = require('../Models/API');

exports.apiKeyGenerator = async(req, res) => {

    const { username } = req.body;
    const secretKey = generateApiKey({
        method: 'string',
        length: 23,
        pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    });

    try {
        const newKey = await APIKey.create({
            createdBy: username,
            api_key: secretKey
        });

        res.status(200).json({
            data: newKey
        })
    } catch (err) {
        console.log(err);
    }


}

exports.getApiKeys = async(req, res) => {

    const { username } = req.body;

    try {
        const keys = await APIKey.find({ createdBy: username });

        res.status(200).json({
            result: keys
        })

    } catch (err) {
        res.status(500).json({
            result: "No keys found for the given user!"
        })
    }
}

exports.deleteKey = async(req, res) => {

    const { apikeyID } = req.body;

    try {
        await APIKey.findByIdAndDelete(apikeyID);
        res.status(200).json({
            message: "deleted."
        })
    } catch (err) {
        console.log(err);
    }
}