const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect(
    "mongodb://localhost:27017/blogapp"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
