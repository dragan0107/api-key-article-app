const Article = require('../Models/Article');

exports.addArticle = async (req, res) => {
  try {
    const art = await Article.create(req.body);
    res.status(200).json({
      data: art,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({
      data: articles,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.commentArticle = async (req, res) => {
  const { comment, artId } = req.body;

  const newItem = {
    comment: comment,
  };

  try {
    await Article.findByIdAndUpdate(artId, { $push: { comments: newItem } });
    res.status(200).json({
      message: 'success',
    });
  } catch (error) {
    res.status(500).json({
      err: error,
    });
  }
};

exports.deleteArticle = async (req, res) => {
  const { artId } = req.params;
  try {
    await Article.findByIdAndDelete(artId);
    res.status(200).json({
      message: 'Successfully deleted article!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong..',
    });
  }
};

exports.updateArticle = async (req, res) => {
  const { artId } = req.params;

  try {
    const updatedArt = await Article.findByIdAndUpdate(artId, req.body, {
      new: true,
    });
    res.status(200).json({
      art: updatedArt,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong..',
    });
  }
};

exports.likeArticle = async (req, res) => {
  try {
    const art = await Article.findById(req.params.id);
    console.log(art);
    if (!art.likes.includes(req.body.user)) {
      //if no likes, it will add one

      if (art.dislikes.includes(req.body.user)) {
        // If there was a dislike by this user before, we remove it so we add the like
        await art.updateOne({ $pull: { dislikes: req.body.user } });
        art.dislikes.length -= 1;
      }

      await art.updateOne({ $push: { likes: req.body.user } });
      res.status(200).json({
        msg: 'post has been liked',
        numOfLikes: art.likes.length + 1,
        numOfDislikes: art.dislikes.length,
      });
    } else {
      //if there is a like already, it takes it away
      await art.updateOne({ $pull: { likes: req.body.user } });
      res.status(200).json({
        msg: 'post has been unliked',
        numOfLikes: art.likes.length - 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'something went wrong.',
    });
  }
};

exports.dislikeArticle = async (req, res) => {
  try {
    const art = await Article.findById(req.params.id);
    if (!art.dislikes.includes(req.body.user)) {
      if (art.likes.includes(req.body.user)) {
        // If there was a like by this user before, we remove it so we add the dislike

        await art.updateOne({ $pull: { likes: req.body.user } });
        art.likes.length -= 1;
      }

      await art.updateOne({ $push: { dislikes: req.body.user } });
      res.status(200).json({
        msg: 'post has been disliked',
        numOfDislikes: art.dislikes.length + 1,
        numOfLikes: art.likes.length,
      });
    } else {
      await art.updateOne({ $pull: { dislikes: req.body.user } });
      res.status(200).json({
        msg: 'dislike has been removed',
        numOfDislikes: art.dislikes.length - 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'something went wrong.',
    });
  }
};
