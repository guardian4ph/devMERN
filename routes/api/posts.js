const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");
const request = require("request");

//@route POST api/post
//@desc  Test Route
//@access Public

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.body.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/post
//@desc  Get all posts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/post/:id
//@desc  Get post by ID
//@access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route Delete api/posts/:id
//@desc  Delete  posts
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //Check if the user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/like/:id
//@desc  Like a post
//@access Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if user already liked the post
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    // add like to the post
    post.likes.unshift({ user: req.user.id });
    //save to db
    await post.save();

    //response
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/unlike/:id
//@desc  Like a post
//@access Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if user already liked the post
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }
    //get remove index of like
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    //splice it out from the array
    post.likes.splice(removeIndex, 1);
    //save to db
    await post.save();

    //response
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/posts/comment/:id
//@desc  Comment on a post
//@access Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      //New Comment
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      //comments is the name of the object in the DB
      post.comments.unshift(newComment);
      //save post
      await post.save();
      //rend reponse
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc  Delelte on a comment
//@access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // create variable to hold the post ID
    const post = await Post.findById(req.params.id);

    // create variable to pull/hold the comment ID to be deleted
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    //Make sure comment exist

    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    //Check user if user in the one  commenting
    // comment.user is object in the DB so you need to convert it to string
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Can only delete yout post" });
    }

    //get remove index of Comment
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    //Take it out splice it out from the array
    post.comments.splice(removeIndex, 1);

    //save to db
    await post.save();

    //return
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
