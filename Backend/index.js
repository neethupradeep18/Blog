const express = require("express");
const cors = require("cors");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());

// In-memory storage with sample data
let blogs = [
  {
    _id: 1,
    title: "Sample Blog 1",
    content: "This is sample content for blog 1",
    img_url: "https://via.placeholder.com/300x200"
  },
  {
    _id: 2,
    title: "Sample Blog 2", 
    content: "This is sample content for blog 2",
    img_url: "https://via.placeholder.com/300x200"
  }
];
let nextId = 3;

app.post("/add", (req, res) => {
  try {
    const newBlog = {
      _id: nextId++,
      title: req.body.title,
      content: req.body.content,
      img_url: req.body.img_url
    };
    blogs.push(newBlog);
    res.send({ message: "Blog added successfully", data: newBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding blog" });
  }
});

app.get("/get", (req, res) => {
  try {
    res.send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching blogs" });
  }
});

app.delete("/delete/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    blogs = blogs.filter(blog => blog._id !== id);
    res.send({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting blog" });
  }
});

app.put("/update/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("Update request for ID:", id, "(type:", typeof id, ")");
    console.log("Current blogs:", blogs.map(b => ({ id: b._id, type: typeof b._id, title: b.title })));
    console.log("Request body:", req.body);
    
    const index = blogs.findIndex(blog => {
      console.log(`Comparing ${blog._id} (${typeof blog._id}) with ${id} (${typeof id})`);
      return blog._id === id;
    });
    
    console.log("Found index:", index);
    
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...req.body };
      res.send({ message: "Blog updated successfully", data: blogs[index] });
    } else {
      res.status(404).send({ message: "Blog not found" });
    }
  } catch (error) {
    console.log("Server error:", error);
    res.status(500).send({ message: "Error updating blog" });
  }
});


app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
