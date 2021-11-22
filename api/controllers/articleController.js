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

exports.commentArticle = async(req, res) => {

    const { comment, artId } = req.body;

    const newItem = {
        comment: comment
    }

    try {
        await Article.findByIdAndUpdate(artId, { $push: { comments: newItem } });
        res.status(200).json({
            message: "success"
        })
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }
}

exports.deleteArticle = async(req, res) => {
    const { artId } = req.params;
    console.log(artId);
    try {
        await Article.findByIdAndDelete(artId);
        res.status(200).json({
            message: 'Successfully deleted article!'
        })
    } catch (error) {
        res.status(500).json({
            message: "Somethign went wrong.."
        });
    }
}