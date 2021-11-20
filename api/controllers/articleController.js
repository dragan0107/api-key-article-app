const Article = require('../Models/Article');


exports.addArticle = async(req, res) => {

    try {
        const res = await Article.create(req.body);
        res.status(200).json({
            data: res
        })
    } catch (err) {
        console.log(err);
    }
}