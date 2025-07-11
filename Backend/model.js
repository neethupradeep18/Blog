const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

const BlogModel = mongoose.model("blogs", schema);
module.exports = BlogModel;
