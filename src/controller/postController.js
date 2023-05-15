const { db } = require("../database/db");
const { uploadFile } = require("./aws");
const moment = require("moment");
const createPost = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;
    const { title, descr, date, cat } = data;
    console.log(descr);
    let userId = req.tokenDetails.userId;

    if (files.length === 0)
      return res.status(400).json({ message: "provide file and image" });

    let img;

    for (let i of files) {
      if (i.fieldname == "img") {
        img = await uploadFile(i);
      }
    }

    const values = [title, descr, img, date, userId, cat];
    const Q =
      "INSERT INTO posts(`title`,`descr`,`img`,`date`,`uid`,`cat`) VALUES (?)";
    db.query(Q, [values], (err, result) => {
      console.log(err);
      if (err) return res.status(500).json({ message: err.message });
      // console.log(result);
      return res.status(201).json({ data: result });
    });
  } catch (error) {
    console.log(error.message, "error in createPost");
    return res.status(500).json({ message: error.message });
  }
};
const editPost = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;
    console.log(data);
    console.log(files);
    let { title, descr, date, img, cat } = data;
    console.log(descr);
    let userId = req.tokenDetails.userId;
    let postId = req.params.id;

    if (files.length > 0) {
      for (let i of files) {
        if (i.fieldname == "img") {
          img = await uploadFile(i);
        }
      }
    }

    const values = [title, descr, img, date, cat];
    const Q =
      "UPDATE posts SET `title`= ?,`descr`= ?,`img`= ?,`date`= ?,`cat`= ? WHERE `id`= ? AND `uid` = ?";
    db.query(Q, [...values, postId, userId], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      // console.log(result);
      return res.status(201).json({ data: result });
    });
  } catch (error) {
    console.log(error.message, "error in createPost");
    return res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const Q = req.query.cat
      ? "SELECT * FROM posts WHERE cat=?"
      : "SELECT * FROM posts";

    db.query(Q, [req.query.cat], (err, result) => {
      if (err) return res.status(400).json({ message: err.message });

      if (result.length === 0)
        return res.status(404).json({ message: "no post found" });

      console.log(result);
      return res.status(200).json({ data: result });
    });
  } catch (error) {
    console.log(error.message, "error in getPost");
    return res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const Q =
      "SELECT p.id, `username`,`title`,`descr`,p.img, u.img As userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id=?";
    db.query(Q, [postId], (err, result) => {
      if (err) return res.status(400).json({ message: err.message });

      if (!result) return res.status(404).json({ message: "data not found" });

      console.log(result);

      return res.status(200).json({ data: result });
    });
  } catch (error) {
    console.log(error.message, "error in getPostById");
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.tokenDetails.userId;
    const Q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
    db.query(Q, [postId, userId], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json({ message: "post has been deleted" });
    });
  } catch (error) {
    console.log(error.message, "error in deletePost");
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPost, getPostById, deletePost, editPost };
