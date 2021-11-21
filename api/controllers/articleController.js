const Article = require('../Models/Article');


exports.addArticle = async(req, res) => {

    try {
        const art = await Article.create(req.body);
        res.status(200).json({
            data: art
        })
    } catch (err) {
        console.log(err);
    }
}


exports.getAllArticles = async(req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json({
            data: articles
        })
    } catch (err) {
        console.log(err);
    }
}